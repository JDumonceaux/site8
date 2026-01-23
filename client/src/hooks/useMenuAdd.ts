import type { ChangeEvent } from 'react';
import { useActionState } from 'react';

import { REQUIRED_FIELD, ServiceUrl } from '@lib/utils/constants';
import { safeParse } from '@lib/utils/schemaHelper';
import type { MenuAdd } from '@types';
import * as v from 'valibot';
import { useAxios } from './axios/useAxios';
import useForm from './useForm';

// Validation schema
const pageSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, REQUIRED_FIELD)),
  parent: v.pipe(v.string(), v.minLength(1, REQUIRED_FIELD)),
  seq: v.pipe(v.string(), v.minLength(1, REQUIRED_FIELD)),
  sortby: v.pipe(v.string(), v.minLength(1, REQUIRED_FIELD)),
  type: v.pipe(v.string(), v.minLength(1, REQUIRED_FIELD)),
});

type FormType = v.InferOutput<typeof pageSchema>;
type FormKeys = keyof FormType;
type SortByType = 'name' | 'seq';
type MenuType = 'menu' | 'root';

type FormState = {
  message?: string;
  success?: boolean;
};

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
    isSaved,
    setErrors,
    setFieldValue,
    setFormValues,
    setIsSaved,
  } = useForm<FormType>(initialFormValues);

  const validateForm = (): boolean => {
    const result = safeParse<FormType>(pageSchema, formValues);
    setErrors(result.error);
    return result.success;
  };

  const getUpdates = (): MenuAdd => ({
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
  });

  const submitForm = async (): Promise<boolean> => {
    const data = getUpdates();
    const result = await putData(ServiceUrl.ENDPOINT_MENUS, data);
    setIsSaved(result != null);
    return result != null;
  };

  // Action function for useActionState
  const submitAction = async (
    _prevState: FormState,
    _formData: FormData,
  ): Promise<FormState> => {
    try {
      // Validate form
      const validationResult = safeParse<FormType>(pageSchema, formValues);
      if (!validationResult.success) {
        setErrors(validationResult.error ?? null);
        return {
          message: 'Validation failed. Please check the form fields.',
          success: false,
        };
      }

      const data = getUpdates();
      const result = await putData(ServiceUrl.ENDPOINT_MENUS, data);

      if (result == null) {
        setIsSaved(false);
        return {
          message: 'Failed to add menu',
          success: false,
        };
      }

      setIsSaved(true);
      return {
        message: 'Menu added successfully',
        success: true,
      };
    } catch (error_: unknown) {
      setIsSaved(false);
      const errorMessage =
        error_ instanceof Error
          ? `Error adding menu: ${error_.message}`
          : 'An unexpected error occurred';
      return {
        message: errorMessage,
        success: false,
      };
    }
  };

  const [actionState, formAction, isPending] = useActionState<
    FormState,
    FormData
  >(submitAction, {});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFieldValue(name as FormKeys, value);
  };

  const getStandardInputTextAttributes = (fieldName: FormKeys) => ({
    errorText: getFieldErrors(fieldName),
    hasError: hasError(fieldName),
    id: fieldName,
    value: getFieldValue(fieldName),
  });

  const clearForm = () => {
    setFormValues(initialFormValues);
  };

  return {
    actionState,
    clearForm,
    error,
    formAction,
    formValues,
    getFieldValue,
    getStandardInputTextAttributes,
    handleInputChange,
    isLoading,
    isPending,
    isSaved,
    pageSchema,
    setFieldValue,
    setFormValues,
    submitForm,
    validateForm,
  };
};

export default useMenuEdit;
