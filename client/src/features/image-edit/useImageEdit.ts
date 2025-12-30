import {
  type ChangeEvent,
  useEffect,
  useEffectEvent,
  useOptimistic,
  useState,
} from 'react';

import useSnackbar from '@features/app/snackbar/useSnackbar';
import useForm from '@hooks/useForm';
import { ServiceUrl } from '@lib/utils/constants';
import { safeParse } from '@lib/utils/zodHelper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ImageEditSchema } from '@site8/shared';

// Local form type — keep minimal allowed props to avoid mismatches with built dist types
type FormType = {
  id: number;
  name?: string;
  fileName?: string;
  folder?: string;
  url?: string;
  tags?: string;
  description?: string;
};
type FormKeys = keyof FormType;
import useImage from './useImage';

type UseImageEditReturn = {
  clearForm: () => void;
  formValues: FormType;
  getDefaultProps: (field: FormKeys) => {
    'data-id': FormKeys;
    'data-line': number;
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    value: string;
  };
  isProcessing: boolean;
  isSaved: boolean;
  resetForm: () => void;
  saveItem: () => Promise<boolean>;
  validateForm: () => boolean;
};

// Consistent default form shape
const defaultForm: FormType = {
  id: 0,
  name: '',
  fileName: '',
  folder: '',
  url: '',
  tags: '',
  description: '',
};

/**
 * Hook for editing an Image entity, handling form state, validation, and persistence.
 */
export const useImageEdit = (
  rawId: null | string,
): Readonly<UseImageEditReturn> => {
  const queryClient = useQueryClient();
  const { setMessage } = useSnackbar();
  const { data: imageData } = useImage(rawId);

  const { formValues, getFieldValue, setErrors, setFieldValue, setFormValues } =
    useForm<FormType>(defaultForm);

  // TanStack Query mutation for saving images
  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const url =
        payload.id > 0
          ? `${ServiceUrl.ENDPOINT_IMAGE}/${payload.id}`
          : ServiceUrl.ENDPOINT_IMAGE;
      const method = 'PATCH';

      const response = await fetch(url, {
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        method,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as any;
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Failed to save image');
      }
    },
    onSuccess: () => {
      setMessage('Saved successfully');
      queryClient.invalidateQueries({ queryKey: ['image'] });
      setIsSaved(true);
    },
  });

  // Initialize or update form when data arrives
  useEffect(() => {
    if (!imageData) return;
    const formData: FormType = {
      ...defaultForm,
      fileName: imageData.fileName ?? '',
      folder: imageData.folder ?? '',
      id: imageData.id,
      name: (imageData as any).title ?? imageData.name ?? '',
      url: (imageData as any).url ?? (imageData as any).official_url ?? '',
      tags: Array.isArray((imageData as any).tags)
        ? (imageData as any).tags.join(',')
        : ((imageData as any).tags ?? ''),
      description: (imageData as any).description ?? '',
    };
    setFormValues(formData);
  }, [imageData, setFormValues]);

  // Form helpers
  const getDefaultProps = (field: FormKeys) => ({
    'data-id': field,
    'data-line': 0,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFieldValue(field, event.target.value);
    },
    value: getFieldValue(field),
  });

  const validateForm = useEffectEvent(() => {
    const result = safeParse<FormType>(ImageEditSchema, formValues);
    setErrors(result.success ? null : (result.error?.issues ?? null));
    return result.success;
  });

  // Save state with optimistic updates
  const [isSaved, setIsSaved] = useState(true);
  const [optimisticSaved, setOptimisticSaved] = useOptimistic(
    isSaved,
    (_state, newValue: boolean) => newValue,
  );

  const saveItem = useEffectEvent(async () => {
    if (!validateForm()) return false;

    const payload: Partial<FormType> & { id: number } = {
      id: formValues.id,
      fileName: formValues.fileName,
      folder: formValues.folder,
      name: formValues.name,
      url: formValues.url,
      tags: formValues.tags,
      description: formValues.description,
    };

    try {
      // Optimistically show as saved
      setOptimisticSaved(true);
      await mutation.mutateAsync(payload);
      return true;
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticSaved(false);
      // eslint-disable-next-line no-console
      console.error('Failed to save image:', error);
      return false;
    }
  });

  const resetForm = useEffectEvent(() => {
    if (imageData) {
      const formData: FormType = {
        ...defaultForm,
        fileName: imageData.fileName ?? '',
        folder: imageData.folder ?? '',
        id: imageData.id,
        name: (imageData as any).title ?? imageData.name ?? '',
        url: (imageData as any).url ?? (imageData as any).official_url ?? '',
        tags: Array.isArray((imageData as any).tags)
          ? (imageData as any).tags.join(',')
          : ((imageData as any).tags ?? ''),
        description: (imageData as any).description ?? '',
      };
      setFormValues(formData);
    }
    setIsSaved(true);
    setErrors(null);
  });

  const clearForm = useEffectEvent(() => {
    setFormValues(defaultForm);
    setIsSaved(true);
    setErrors(null);
  });

  // Update unsaved flag when values change
  const checkUnsaved = useEffectEvent(() => {
    if (!imageData) {
      setIsSaved(false);
      return;
    }
    // Deep equality check for all fields
    const keys = Object.keys(defaultForm) as (keyof FormType)[];
    const hasChanges = keys.some((key) => {
      if (key === 'name') {
        return (
          formValues.name !== ((imageData as any).title ?? imageData.name ?? '')
        );
      }
      return formValues[key] !== ((imageData as any)[key as string] ?? '');
    });
    setIsSaved(!hasChanges);
  });

  useEffect(() => {
    checkUnsaved();
  }, [formValues, imageData]);

  return {
    clearForm,
    formValues,
    getDefaultProps,
    isProcessing: mutation.isPending,
    isSaved: optimisticSaved,
    resetForm,
    saveItem,
    validateForm,
  } as const;
};

export default useImageEdit;
