import { useCallback, useMemo } from 'react';
import { REQUIRED_FIELD, ServiceUrl } from 'utils';
import { z } from 'zod';
import { useAxios } from './Axios/useAxios';

import { MenuAdd } from 'types';
import { useForm } from './useForm';
import { safeParse } from 'utils/zodHelper';

// Define Zod Shape
const pageSchema = z.object({
  name: z.string().min(1, REQUIRED_FIELD),
  parent: z.string().min(1, REQUIRED_FIELD),
  seq: z.string().min(1, REQUIRED_FIELD),
  sortby: z.string().min(1, REQUIRED_FIELD),
});

// Create a type from the schema
export type FormValues = z.infer<typeof pageSchema>;
export type keys = keyof FormValues;
export type sortByType = 'seq' | 'name';

const useMenuEdit = () => {
  const { postData, isLoading, error } = useAxios<MenuAdd>();
  // Return default form values
  const initialFormValues: FormValues = useMemo(
    () => ({
      name: '',
      parent: '',
      seq: '0',
      sortby: 'name',
    }),
    [],
  );

  // Create a form
  const {
    formValues,
    isSaved,
    isProcessing,
    setIsProcessing,
    setFieldValue,
    setAllValues,
    setIsSaved,
    setErrors,
    getFieldValue,
    getFieldErrors,
    hasError,
  } = useForm<FormValues>(initialFormValues);

  //Validate form
  const validateForm = useCallback(() => {
    const result = safeParse<FormValues>(pageSchema, formValues);
    setErrors(result.error?.issues);
    return result.success;
  }, [formValues, setErrors]);

  // Get the updates
  const getUpdates = useCallback((): MenuAdd => {
    return {
      id: 0,
      name: formValues.name,
      parentId: parseInt(formValues.parent),
      seq: parseInt(formValues.seq),
      sortby: formValues.sortby as sortByType,
      type: 'menu',
      to: formValues.name.toLowerCase().replaceAll(' ', '-'),
    };
  }, [formValues]);

  // Handle save
  const submitForm = useCallback(async () => {
    const data = getUpdates();
    if (!data) {
      return false;
    }
    setIsProcessing(true);
    const result = await postData(`${ServiceUrl.ENDPOINT_MENUS}`, data);
    setIsProcessing(false);
    setIsSaved(result);
    return result;
  }, [getUpdates, postData, setIsProcessing, setIsSaved]);

  const handleChange = useCallback(
    (fieldName: keys, value: string) => {
      setFieldValue(fieldName, value);
    },
    [setFieldValue],
  );

  const handleSave = useCallback(async () => {
    const ret = await submitForm();
    return ret;
  }, [submitForm]);

  const getStandardTextInputAttributes = useCallback(
    (fieldName: keys) => {
      return {
        id: fieldName,
        value: getFieldValue(fieldName),
        errorText: getFieldErrors(fieldName),
        hasError: hasError(fieldName),
      };
    },
    [getFieldErrors, getFieldValue, hasError],
  );

  return useMemo(
    () => ({
      pageSchema,
      formValues,
      isProcessing,
      isLoading,
      error,
      isSaved,
      getFieldValue,
      getStandardTextInputAttributes,
      setAllValues,
      setFieldValue,
      handleChange,
      handleSave,
      validateForm,
    }),
    [
      formValues,
      isProcessing,
      isLoading,
      error,
      isSaved,
      getFieldValue,
      getStandardTextInputAttributes,
      setAllValues,
      setFieldValue,
      handleChange,
      handleSave,
      validateForm,
    ],
  );
};

export default useMenuEdit;