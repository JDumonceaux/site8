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
export type FormType = z.infer<typeof pageSchema>;
export type keys = keyof FormType;
export type sortByType = 'seq' | 'name';
export type menuType = 'menu' | 'root';

const useMenuEdit = () => {
  const { postData, isLoading, error } = useAxios<MenuAdd>();
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
    isSaved,
    isProcessing,
    setIsProcessing,
    setFieldValue,
    setFormValues,
    setIsSaved,
    setErrors,
    getFieldValue,
    getFieldErrors,
    hasError,
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
          id: parseInt(formValues.parent),
          seq: parseInt(formValues.seq),
          sortby: formValues.sortby as sortByType,
        },
      ],
      type: formValues.type as menuType,
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

  const getStandardInputTextAttributes = useCallback(
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

  const clearForm = useCallback(() => {
    setFormValues(initialFormValues);
  }, [initialFormValues, setFormValues]);

  return useMemo(
    () => ({
      pageSchema,
      formValues,
      isProcessing,
      isLoading,
      error,
      isSaved,
      getFieldValue,
      getStandardInputTextAttributes,
      setFormValues,
      setFieldValue,
      handleChange,
      clearForm,
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
