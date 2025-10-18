import { useState, useEffect, type ChangeEvent } from 'react';
import { ServiceUrl } from '@lib/utils/constants';
import { getSRC } from '@lib/utils/helpers';
import { safeParse } from '@lib/utils/zodHelper';
import type { Image } from '../../types/Image';
import pageSchema, { type FormKeys, type FormType } from './schema';
import useImage from './useImage';
import { useAxios } from '@hooks/Axios/useAxios';
import useForm from '@hooks/useForm';

/**
 * Hook for editing an Image entity, handling form state, validation, and persistence.
 */
export const useImageEdit = (rawId: string | null) => {
  const { patchData, putData } = useAxios<Image>();
  const { data: imageData } = useImage(rawId);

  // Parse ID or action keyword
  let currentId = 0;
  let currentAction: string | null = null;
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

  const { formValues, getFieldValue, setFieldValue, setFormValues, setErrors } =
    useForm<FormType>(defaultForm);

  // Keep original for reset
  const [originalValues, setOriginalValues] = useState<Image | null>(null);

  // Initialize or update form when data arrives
  useEffect(() => {
    if (!imageData) return;
    const formData: FormType = {
      ...defaultForm,
      id: imageData.id,
      fileName: imageData.fileName ?? '',
      folder: imageData.folder ?? '',
      location: imageData.location ?? '',
      official_url: imageData.official_url ?? '',
      src: getSRC(imageData.folder, imageData.fileName),
    };
    setFormValues(formData);
    setOriginalValues(imageData);
  }, [imageData]);

  // Form helpers
  function getDefaultProps(field: FormKeys) {
    return {
      'data-id': field,
      'data-line': 0,
      value: getFieldValue(field),
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFieldValue(field, e.target.value);
      },
    };
  }

  function validateForm() {
    const result = safeParse<FormType>(pageSchema, formValues);
    setErrors(result.success ? null : result.error?.issues);
    return result.success;
  }

  // Save state
  const [isSaved, setIsSaved] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  async function saveItem() {
    if (!validateForm()) return false;
    setIsProcessing(true);

    const payload: Image = {
      ...formValues,
      // map tags string to array if needed
    } as any;

    try {
      if (payload.id > 0) {
        await patchData(`${ServiceUrl.ENDPOINT_IMAGE}/${payload.id}`, payload);
      } else {
        await putData(ServiceUrl.ENDPOINT_IMAGE, payload);
      }
      setIsSaved(true);
      return true;
    } finally {
      setIsProcessing(false);
    }
  }

  function resetForm() {
    if (originalValues) {
      const formData: FormType = {
        ...defaultForm,
        id: originalValues.id,
        fileName: originalValues.fileName ?? '',
        folder: originalValues.folder ?? '',
        location: originalValues.location ?? '',
        official_url: originalValues.official_url ?? '',
        src: getSRC(originalValues.folder, originalValues.fileName),
      };
      setFormValues(formData);
    }
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(null);
  }

  function clearForm() {
    setFormValues(defaultForm);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(null);
  }

  // Update unsaved flag when values change
  useEffect(() => {
    setIsSaved(JSON.stringify(formValues) === JSON.stringify(originalValues));
  }, [formValues, originalValues]);

  return {
    formValues,
    getDefaultProps,
    validateForm,
    saveItem,
    resetForm,
    clearForm,
    isProcessing,
    isSaved,
  };
};

export default useImageEdit;
