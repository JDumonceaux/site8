import { REQUIRED_FIELD, ServiceUrl } from 'lib/utils/constants';
import { safeParse } from 'lib/utils/zodHelper';
import { useCallback, useMemo } from 'react';
import { MenuAdd } from 'types';
import { z } from 'zod';

import { useAxios } from './Axios/useAxios';
import { useForm } from './useForm';

// Define Zod Shape
const pageSchema = z.object({
  name: z.string().min(1, REQUIRED_FIELD),
  parent: z.string().min(1, REQUIRED_FIELD),
  seq: z.string().min(1, REQUIRED_FIELD),
  sortby: z.string().min(1, REQUIRED_FIELD),
  type: z.string().min(1, REQUIRED_FIELD),
});

// Create a type from the schema
type FormType = z.infer<typeof pageSchema>;
type keys = keyof FormType;
type sortByType = 'name' | 'seq';
type menuType = 'menu' | 'root';

const useMenuEdit = () => {
  const { error, isLoading, postData } = useAxios<MenuAdd>();
  // Return default form values
  const initialFormValues: FormType = useMemo(
    () => ({
      name: '',
      parent: '',
      seq: '0',
      sortby: 'name',
      type: 'menu',
    }),
    [],
  );

  // Create a form
  const {
    formValues,
    getFieldErrors,
    getFieldValue,
    hasError,
    isProcessing,
    isSaved,
    setErrors,
    setFieldValue,
    setFormValues,
    setIsProcessing,
    setIsSaved,
  } = useForm<FormType>(initialFormValues);

  //Validate form
  const validateForm = useCallback(() => {
    const result = safeParse<FormType>(pageSchema, formValues);
    setErrors(result.error?.issues);
    return result.success;
  }, [formValues, setErrors]);

  // Get the updates
  const getUpdates = useCallback((): MenuAdd => {
    return {
      id: 0,
      name: formValues.name,
      parentItems: [
        {
          id: Number.parseInt(formValues.parent),
          seq: Number.parseInt(formValues.seq),
          sortby: formValues.sortby as sortByType,
        },
      ],
      to: formValues.name.toLowerCase().replaceAll(' ', '-'),
      type: formValues.type as menuType,
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

  const getStandardInputTextAttributes = useCallback(
    (fieldName: keys) => {
      return {
        errorText: getFieldErrors(fieldName),
        hasError: hasError(fieldName),
        id: fieldName,
        value: getFieldValue(fieldName),
      };
    },
    [getFieldErrors, getFieldValue, hasError],
  );

  const clearForm = useCallback(() => {
    setFormValues(initialFormValues);
  }, [initialFormValues, setFormValues]);

  return useMemo(
    () => ({
      clearForm,
      error,
      formValues,
      getFieldValue,
      getStandardInputTextAttributes,
      handleChange,
      isLoading,
      isProcessing,
      isSaved,
      pageSchema,
      setFieldValue,
      setFormValues,
      submitForm,
      validateForm,
    }),
    [
      formValues,
      isProcessing,
      isLoading,
      error,
      isSaved,
      getFieldValue,
      getStandardInputTextAttributes,
      setFormValues,
      setFieldValue,
      clearForm,
      handleChange,
      submitForm,
      validateForm,
    ],
  );
};

export default useMenuEdit;
