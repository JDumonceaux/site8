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
import { type ImageEdit, ImageEditSchema } from '@site8/shared';

type FormKeys = keyof ImageEdit;
import useImage from './useImage';

type UseImageEditReturn = {
  clearForm: () => void;
  formValues: ImageEdit;
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
const defaultForm: ImageEdit = {
  id: 0,
  name: '',
  fileName: '',
  folder: '',
  ext_url: '',
  description: '',
};

// Helper to map imageData to form structure
const mapToFormData = (data: any): ImageEdit => ({
  ...defaultForm,
  id: data.id,
  name: data.name ?? '',
  fileName: data.fileName ?? '',
  folder: data.folder ?? '',
  ext_url: data.ext_url ?? '',
  description: data.description ?? '',
});

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
    useForm<ImageEdit>(defaultForm);

  // TanStack Query mutation for saving images
  const mutation = useMutation({
    mutationFn: async (payload: ImageEdit) => {
      // Use POST for new items (id === 0), PATCH for updates
      // All data (including ID) goes in request body, not URL
      const method = payload.id > 0 ? 'PATCH' : 'POST';

      const response = await fetch(ServiceUrl.ENDPOINT_IMAGE, {
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        method,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as ImageEdit;
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
    },
  });

  // Initialize or update form when data arrives
  useEffect(() => {
    if (!imageData) return;
    setFormValues(mapToFormData(imageData));
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
    const result = safeParse<ImageEdit>(ImageEditSchema, formValues);
    setErrors(result.success ? null : (result.error?.issues ?? null));
    return result.success;
  });

  // Save state with optimistic updates
  const [isSaved, setIsSaved] = useState(false);
  const [optimisticSaved, setOptimisticSaved] = useOptimistic(
    isSaved,
    (_state, newValue: boolean) => newValue,
  );

  const saveItem = useEffectEvent(async () => {
    if (!validateForm()) return false;

    const payload: ImageEdit = {
      id: formValues.id,
      name: formValues.name,
      fileName: formValues.fileName,
      folder: formValues.folder,
      ext_url: formValues.ext_url,
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
      setFormValues(mapToFormData(imageData));
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
    // Compare form values with mapped image data
    const currentData = mapToFormData(imageData);
    const hasChanges = (Object.keys(defaultForm) as (keyof ImageEdit)[]).some(
      (key) => formValues[key] !== currentData[key],
    );
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
