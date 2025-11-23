import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useAxios } from '@hooks/axios/useAxios';
import useForm from '@hooks/useForm';
import { ServiceUrl } from '@lib/utils/constants';
import { getSRC } from '@lib/utils/helpers';
import { safeParse } from '@lib/utils/zodHelper';
import type { Image } from '@shared/types/Image';
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

/**
 * Hook for editing an Image entity, handling form state, validation, and persistence.
 */
export const useImageEdit = (rawId: null | string): UseImageEditReturn => {
  const { patchData, putData } = useAxios<Image>();
  const { data: imageData } = useImage(rawId);

  // Form defaults
  const defaultForm: FormType = useMemo(
    () => ({
      description: '',
      fileName: '',
      folder: '',
      id: 0,
      location: '',
      name: '',
      official_url: '',
      tags: '',
    }),
    [],
  );

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
  }, [imageData, defaultForm, setFormValues]);

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

  // Save state
  const [isSaved, setIsSaved] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const saveItem = useCallback(async () => {
    if (!validateForm()) return false;
    setIsProcessing(true);

    const payload: Image = {
      fileName: formValues.fileName,
      folder: formValues.folder,
      id: formValues.id,
      location: formValues.location,
      official_url: formValues.official_url,
      title: formValues.name,
    };

    try {
      await (payload.id > 0
        ? patchData(`${ServiceUrl.ENDPOINT_IMAGE}/${payload.id}`, payload)
        : putData(ServiceUrl.ENDPOINT_IMAGE, payload));
      setIsSaved(true);
      return true;
    } catch (error) {
      console.error('Failed to save image:', error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [formValues, patchData, putData, validateForm]);

  const resetForm = useCallback(() => {
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
  }, [defaultForm, originalValues, setErrors, setFormValues]);

  const clearForm = useCallback(() => {
    setFormValues(defaultForm);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(null);
  }, [defaultForm, setErrors, setFormValues]);

  // Update unsaved flag when values change
  useEffect(() => {
    if (!originalValues) {
      setIsSaved(false);
      return;
    }

    const hasChanges =
      formValues.fileName !== (originalValues.fileName ?? '') ||
      formValues.folder !== (originalValues.folder ?? '') ||
      formValues.location !== (originalValues.location ?? '') ||
      formValues.name !== (originalValues.title ?? '') ||
      formValues.official_url !== (originalValues.official_url ?? '');

    setIsSaved(!hasChanges);
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
