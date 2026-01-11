import {
  type ChangeEvent,
  useActionState,
  useCallback,
  useEffect,
  useOptimistic,
} from 'react';

import useSnackbar from '@features/app/snackbar/useSnackbar';
import useForm from '@hooks/useForm';
import { ServiceUrl } from '@lib/utils/constants';
import { safeParse } from '@lib/utils/schemaHelper';
import { type ImageEdit, ImageEditSchema } from '@site8/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useImage from './useImage';

type FormKeys = keyof ImageEdit;

type ActionState = {
  message?: string;
  success?: boolean;
};

type UseImageEditReturn = {
  actionState: ActionState;
  clearForm: () => void;
  formAction: (formData: FormData) => void;
  formValues: ImageEdit;
  getDefaultProps: (field: FormKeys) => {
    'data-id': FormKeys;
    'data-line': number;
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    value: string;
  };
  isPending: boolean;
  isProcessing: boolean;
  isSaved: boolean;
  resetForm: () => void;
  validateForm: () => boolean;
};

// Consistent default form shape
const defaultForm: ImageEdit = {
  description: '',
  ext_url: '',
  fileName: '',
  folder: '',
  id: 0,
  name: '',
};

// Helper to map imageData to form structure
const mapToFormData = (data: unknown): ImageEdit => {
  // Type guard to ensure data has expected structure
  const isValidImageData = (value: unknown): value is Partial<ImageEdit> => {
    return typeof value === 'object' && value !== null;
  };

  if (!isValidImageData(data)) {
    return defaultForm;
  }

  return {
    ...defaultForm,
    description:
      typeof data.description === 'string'
        ? data.description
        : defaultForm.description,
    ext_url:
      typeof data.ext_url === 'string' ? data.ext_url : defaultForm.ext_url,
    fileName:
      typeof data.fileName === 'string' ? data.fileName : defaultForm.fileName,
    folder: typeof data.folder === 'string' ? data.folder : defaultForm.folder,
    id: typeof data.id === 'number' ? data.id : defaultForm.id,
    name: typeof data.name === 'string' ? data.name : defaultForm.name,
  };
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

  const {
    formValues,
    getFieldValue,
    isSaved,
    setErrors,
    setFieldValue,
    setFormValues,
    setIsSaved,
  } = useForm<ImageEdit>(defaultForm);

  // Optimistic updates for save state
  const [optimisticSaved, setOptimisticSaved] = useOptimistic(
    isSaved,
    (_state, newValue: boolean) => newValue,
  );

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
      void queryClient.invalidateQueries({ queryKey: ['image'] });
    },
  });

  // Form action for useActionState (defined after mutation)
  const submitAction = async (
    _prevState: ActionState,
    _formData: FormData,
  ): Promise<ActionState> => {
    try {
      // Validate form
      const result = safeParse<ImageEdit>(ImageEditSchema, formValues);
      if (!result.success) {
        setErrors(result.error ?? null);
        return { message: 'Validation failed', success: false };
      }

      // Build payload from formValues
      const payload: ImageEdit = {
        description: formValues.description,
        ext_url: formValues.ext_url,
        fileName: formValues.fileName,
        folder: formValues.folder,
        id: formValues.id,
        name: formValues.name,
      };

      // Optimistically show as saved
      setOptimisticSaved(true);
      await mutation.mutateAsync(payload);
      return { message: 'Success', success: true };
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticSaved(false);
      const message =
        error instanceof Error ? error.message : 'Failed to save image';
      return { message, success: false };
    }
  };

  const [actionState, formAction, isPending] = useActionState<
    ActionState,
    FormData
  >(submitAction, { success: undefined });

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

  const validateForm = useCallback(() => {
    const result = safeParse<ImageEdit>(ImageEditSchema, formValues);
    setErrors(result.success ? null : (result.error ?? null));
    return result.success;
  }, [formValues, setErrors]);

  const resetForm = useCallback(() => {
    if (imageData) {
      setFormValues(mapToFormData(imageData));
    }
    setIsSaved(true);
    setErrors(null);
  }, [imageData, setFormValues, setIsSaved, setErrors]);

  const clearForm = useCallback(() => {
    setFormValues(defaultForm);
    setIsSaved(true);
    setErrors(null);
  }, [setFormValues, setIsSaved, setErrors]);

  // Update saved flag when form values differ from server data
  useEffect(() => {
    if (!imageData) {
      // No server data yet, consider unsaved
      setIsSaved(false);
      return;
    }
    // Compare form values with mapped image data
    const currentData = mapToFormData(imageData);
    const hasChanges = (Object.keys(defaultForm) as (keyof ImageEdit)[]).some(
      (key) => formValues[key] !== currentData[key],
    );
    setIsSaved(!hasChanges);
  }, [formValues, imageData, setIsSaved]);

  return {
    actionState,
    clearForm,
    formAction,
    formValues,
    getDefaultProps,
    isPending,
    isProcessing: mutation.isPending || isPending,
    isSaved: optimisticSaved,
    resetForm,
    validateForm,
  } as const;
};

export default useImageEdit;
