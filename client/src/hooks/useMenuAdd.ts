import { useCallback, useMemo } from 'react';

import { REQUIRED_FIELD, ServiceUrl } from 'lib/utils/constants';
import { safeParse } from 'lib/utils/zodHelper';
import type { MenuAdd } from 'types';
import { z } from 'zod';

import { useAxios } from './Axios/useAxios';
import useForm from './useForm';

// Define the validation schema for the menu page form
const pageSchema = z.object({
  name: z.string().min(1, REQUIRED_FIELD),
  parent: z.string().min(1, REQUIRED_FIELD),
  seq: z.string().min(1, REQUIRED_FIELD),
  sortby: z.string().min(1, REQUIRED_FIELD),
  type: z.string().min(1, REQUIRED_FIELD),
});

type FormType = z.infer<typeof pageSchema>;
type FormKeys = keyof FormType;
type SortByType = 'name' | 'seq';
type MenuType = 'menu' | 'root';

const useMenuEdit = () => {
  const { error, isLoading, putData } = useAxios<MenuAdd>();

  // Default form values
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

  // Form state and helper methods
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

  // Validate the form using Zod and update errors accordingly
  const validateForm = useCallback((): boolean => {
    const result = safeParse<FormType>(pageSchema, formValues);
    setErrors(result.error?.issues ?? null);
    return result.success;
  }, [formValues, setErrors]);

  // Prepare the payload for updating the menu
  const getUpdates = useCallback(
    (): MenuAdd => ({
      id: 0,
      name: formValues.name,
      parentItems: [
        {
          id: Number.parseInt(formValues.parent, 10),
          seq: Number.parseInt(formValues.seq, 10),
          sortby: formValues.sortby as SortByType,
        },
      ],
      to: formValues.name.toLowerCase().replaceAll(' ', '-'),
      type: formValues.type as MenuType,
    }),
    [formValues],
  );

  // Submit the form data via Axios
  const submitForm = useCallback(async (): Promise<boolean> => {
    const data = getUpdates();
    setIsProcessing(true);
    const result = await putData(ServiceUrl.ENDPOINT_MENUS, data);
    setIsProcessing(false);
    setIsSaved(result);
    return result;
  }, [getUpdates, putData, setIsProcessing, setIsSaved]);

  // Update a form field's value on input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFieldValue(name as FormKeys, value);
    },
    [setFieldValue],
  );

  // Retrieve standard text input attributes for a given field
  const getStandardInputTextAttributes = useCallback(
    (fieldName: FormKeys) => ({
      errorText: getFieldErrors(fieldName),
      hasError: hasError(fieldName),
      id: fieldName,
      value: getFieldValue(fieldName),
    }),
    [getFieldErrors, getFieldValue, hasError],
  );

  // Reset the form to its initial state
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
      handleInputChange,
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
      clearForm,
      error,
      formValues,
      getFieldValue,
      getStandardInputTextAttributes,
      handleInputChange,
      isLoading,
      isProcessing,
      isSaved,
      setFieldValue,
      setFormValues,
      submitForm,
      validateForm,
    ],
  );
};

export default useMenuEdit;
