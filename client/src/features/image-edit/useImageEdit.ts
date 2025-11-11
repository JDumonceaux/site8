import { type ChangeEvent, useEffect, useState } from 'react';

import { useAxios } from '@hooks/Axios/useAxios';
import useForm from '@hooks/useForm';
import { ServiceUrl } from '@lib/utils/constants';
import { getSRC } from '@lib/utils/helpers';
import { safeParse } from '@lib/utils/zodHelper';
import type { Image } from '../../types/Image';
import pageSchema, { type FormKeys, type FormType } from './schema';
import useImage from './useImage';

/**
 * Hook for editing an Image entity, handling form state, validation, and persistence.
 */
export const useImageEdit = (rawId: null | string) => {
  const { patchData, putData } = useAxios<Image>();
  const { data: imageData } = useImage(rawId);

  // Parse ID or action keyword
  let currentId = 0;
  let currentAction: null | string = null;
  if (rawId) {
    const parsed = Number(rawId);
    if (!Number.isNaN(parsed) && parsed > 0) {
      currentId = parsed;
    } else if (['first', 'last', 'next', 'prev'].includes(rawId)) {
      currentAction = rawId;
    }
  }

  // Form defaults
  const defaultForm: FormType = {
    description: '',
    fileName: '',
    folder: '',
    id: 0,
    location: '',
    name: '',
    official_url: '',
    tags: '',
  };

  const { formValues, getFieldValue, setErrors, setFieldValue, setFormValues } =
    useForm<FormType>(defaultForm);

  // Keep original for reset
  const [originalValues, setOriginalValues] = useState<Image | null>(null);

  // Initialize or update form when data arrives
  useEffect(() => {
    if (!imageData) return;
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
    setOriginalValues(imageData);
  }, [imageData]);

  // Form helpers
  const getDefaultProps = (field: FormKeys) => ({
    'data-id': field,
    'data-line': 0,
    onChange: (error: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFieldValue(field, error.target.value);
    },
    value: getFieldValue(field),
  });

  const validateForm = () => {
    const result = safeParse<FormType>(pageSchema, formValues);
    setErrors(result.success ? null : result.error?.issues);
    return result.success;
  };

  // Save state
  const [isSaved, setIsSaved] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const saveItem = async () => {
    if (!validateForm()) return false;
    setIsProcessing(true);

    const payload: Image = {
      ...formValues,
      // map tags string to array if needed
    } as any;

    try {
      await (payload.id > 0
        ? patchData(`${ServiceUrl.ENDPOINT_IMAGE}/${payload.id}`, payload)
        : putData(ServiceUrl.ENDPOINT_IMAGE, payload));
      setIsSaved(true);
      return true;
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    if (originalValues) {
      const formData: FormType = {
        ...defaultForm,
        fileName: originalValues.fileName ?? '',
        folder: originalValues.folder ?? '',
        id: originalValues.id,
        location: originalValues.location ?? '',
        official_url: originalValues.official_url ?? '',
        src: getSRC(originalValues.folder, originalValues.fileName),
      };
      setFormValues(formData);
    }
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(null);
  };

  const clearForm = () => {
    setFormValues(defaultForm);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(null);
  };

  // Update unsaved flag when values change
  useEffect(() => {
    setIsSaved(JSON.stringify(formValues) === JSON.stringify(originalValues));
  }, [formValues, originalValues]);

  return {
    clearForm,
    formValues,
    getDefaultProps,
    isProcessing,
    isSaved,
    resetForm,
    saveItem,
    validateForm,
  };
};

export default useImageEdit;
