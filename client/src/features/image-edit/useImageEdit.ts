import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useOptimistic,
  useState,
} from 'react';
import { useEffectEvent } from 'react';

import useSnackbar from '@features/app/snackbar/useSnackbar';
import useForm from '@hooks/useForm';
import { ServiceUrl } from '@lib/utils/constants';
import { getSRC } from '@lib/utils/helpers';
import { safeParse } from '@lib/utils/zodHelper';
import type { Image } from '@types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import imageEditSchema, { type FormKeys, type FormType } from './schema';
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
  fileName: '',
  folder: '',
  id: 0,
  location: '',
  name: '',
  official_url: '',
  src: '',
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
    mutationFn: async (payload: Image) => {
      if (payload.id > 0) {
        return axios.patch<Image>(
          `${ServiceUrl.ENDPOINT_IMAGE}/${payload.id}`,
          payload,
        );
      }
      return axios.put<Image>(ServiceUrl.ENDPOINT_IMAGE, payload);
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
      location: imageData.location ?? '',
      name: imageData.title ?? '',
      official_url: imageData.official_url ?? '',
      src: getSRC(imageData.folder, imageData.fileName),
    };
    setFormValues(formData);
  }, [imageData, setFormValues]);

  // Form helpers
  const getDefaultProps = useCallback(
    (field: FormKeys) => ({
      'data-id': field,
      'data-line': 0,
      onChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setFieldValue(field, event.target.value);
      },
      value: getFieldValue(field),
    }),
    [getFieldValue, setFieldValue],
  );

  const validateForm = useCallback(() => {
    const result = safeParse<FormType>(imageEditSchema, formValues);
    setErrors(result.success ? null : (result.error?.issues ?? null));
    return result.success;
  }, [formValues, setErrors]);

  // Save state with optimistic updates
  const [isSaved, setIsSaved] = useState(true);
  const [optimisticSaved, setOptimisticSaved] = useOptimistic(
    isSaved,
    (_state, newValue: boolean) => newValue,
  );

  const saveItem = useCallback(async () => {
    if (!validateForm()) return false;

    const payload: Image = {
      fileName: formValues.fileName,
      folder: formValues.folder,
      id: formValues.id,
      location: formValues.location,
      official_url: formValues.official_url,
      title: formValues.name,
    };

    try {
      // Optimistically show as saved
      setOptimisticSaved(true);
      await mutation.mutateAsync(payload);
      return true;
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticSaved(false);
      console.error('Failed to save image:', error);
      return false;
    }
  }, [formValues, mutation, setOptimisticSaved, validateForm]);

  const resetForm = useCallback(() => {
    if (imageData) {
      const formData: FormType = {
        ...defaultForm,
        fileName: imageData.fileName ?? '',
        folder: imageData.folder ?? '',
        id: imageData.id,
        location: imageData.location ?? '',
        official_url: imageData.official_url ?? '',
        src: getSRC(imageData.folder, imageData.fileName),
      };
      setFormValues(formData);
    }
    setIsSaved(true);
    setErrors(null);
  }, [imageData, setErrors, setFormValues]);

  const clearForm = useCallback(() => {
    setFormValues(defaultForm);
    setIsSaved(true);
    setErrors(null);
  }, [setErrors, setFormValues]);

  // Update unsaved flag when values change
  const checkUnsaved = useEffectEvent(() => {
    if (!imageData) {
      setIsSaved(false);
      return;
    }
    // Deep equality check for all fields
    const keys = Object.keys(defaultForm) as (keyof FormType)[];
    const hasChanges = keys.some((key) => {
      if (key === 'src') {
        // src is derived, compare with calculated value
        return formValues.src !== getSRC(imageData.folder, imageData.fileName);
      }
      if (key === 'name') {
        return formValues.name !== (imageData.title ?? '');
      }
      return formValues[key] !== (imageData[key as keyof Image] ?? '');
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
