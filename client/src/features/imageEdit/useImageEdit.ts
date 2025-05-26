import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ChangeEvent,
} from 'react';

import { ServiceUrl } from 'lib/utils/constants';
import { getSRC } from 'lib/utils/helpers';
import { safeParse } from 'lib/utils/zodHelper';
import type { Image } from 'types/Image';

import pageSchema, { type FormKeys, type FormType } from './schema';
import useImage from './useImage';
import { useAxios } from '../../hooks/Axios/useAxios';
import useForm from '../../hooks/useForm';

/**
 * Hook for editing an Image entity, handling form state, validation, and persistence.
 */
export const useImageEdit = (rawId: string | null) => {
  const { patchData, putData } = useAxios<Image>();
  const { data: imageData } = useImage(rawId);

  // Parse ID or action keyword
  const { currentId, currentAction } = useMemo(() => {
    let idNum = 0;
    let action: string | null = null;
    if (rawId) {
      const parsed = Number(rawId);
      if (!Number.isNaN(parsed) && parsed > 0) idNum = parsed;
      else if (['first', 'last', 'next', 'prev'].includes(rawId))
        action = rawId;
    }
    return { currentId: idNum, currentAction: action };
  }, [rawId]);

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

  const { formValues, getFieldValue, setFieldValue, setFormValues, setErrors } =
    useForm<FormType>(defaultForm);

  // Keep original for reset
  const [originalValues, setOriginalValues] = useState<Image | null>(null);

  // Initialize or update form when data arrives
  const updateForm = useCallback(
    (item: Image | null | undefined) => {
      if (!item) return;
      const formData: FormType = {
        ...defaultForm,
        id: item.id,
        fileName: item.fileName ?? '',
        folder: item.folder ?? '',
        location: item.location ?? '',
        official_url: item.official_url ?? '',
        src: getSRC(item.folder, item.fileName),
      };
      setFormValues(formData);
      setOriginalValues(item);
    },
    [defaultForm, setFormValues],
  );

  useEffect(() => {
    updateForm(imageData);
  }, [imageData, updateForm]);

  // Form helpers
  const getDefaultProps = useCallback(
    (field: FormKeys) => ({
      'data-id': field,
      'data-line': 0,
      value: getFieldValue(field),
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFieldValue(field, e.target.value);
      },
    }),
    [getFieldValue, setFieldValue],
  );

  const validateForm = useCallback(() => {
    const result = safeParse<FormType>(pageSchema, formValues);
    setErrors(result.success ? null : result.error?.issues);
    return result.success;
  }, [formValues, setErrors]);

  // Save state
  const [isSaved, setIsSaved] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const saveItem = useCallback(async () => {
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
  }, [formValues, patchData, putData, validateForm]);

  const resetForm = useCallback(() => {
    if (originalValues) updateForm(originalValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(null);
  }, [originalValues, updateForm, setErrors]);

  const clearForm = useCallback(() => {
    setFormValues(defaultForm);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(null);
  }, [defaultForm, setFormValues, setErrors]);

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
