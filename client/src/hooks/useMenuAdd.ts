import type { ChangeEvent } from 'react';
import { z } from 'zod';

import { REQUIRED_FIELD, ServiceUrl } from 'lib/utils/constants';
import { safeParse } from 'lib/utils/zodHelper';
import type { MenuAdd } from 'types';

import { useAxios } from './Axios/useAxios';
import useForm from './useForm';

// Validation schema
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

// Default form values
const initialFormValues: FormType = {
  name: '',
  parent: '',
  seq: '0',
  sortby: 'name',
  type: 'menu',
};

const useMenuEdit = () => {
  const { error, isLoading, putData } = useAxios<MenuAdd>();

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

  function validateForm(): boolean {
    const result = safeParse<FormType>(pageSchema, formValues);
    setErrors(result.error?.issues ?? null);
    return result.success;
  }

  function getUpdates(): MenuAdd {
    return {
      id: 0,
      name: formValues.name,
      parentItems: [
        {
          id: parseInt(formValues.parent, 10),
          seq: parseInt(formValues.seq, 10),
          sortby: formValues.sortby as SortByType,
        },
      ],
      to: formValues.name.toLowerCase().replaceAll(' ', '-'),
      type: formValues.type as MenuType,
    };
  }

  async function submitForm(): Promise<boolean> {
    const data = getUpdates();
    setIsProcessing(true);
    const result = await putData(ServiceUrl.ENDPOINT_MENUS, data);
    setIsProcessing(false);
    setIsSaved(result);
    return result;
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFieldValue(name as FormKeys, value);
  }

  function getStandardInputTextAttributes(fieldName: FormKeys) {
    return {
      errorText: getFieldErrors(fieldName),
      hasError: hasError(fieldName),
      id: fieldName,
      value: getFieldValue(fieldName),
    };
  }

  function clearForm() {
    setFormValues(initialFormValues);
  }

  return {
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
  };
};

export default useMenuEdit;
