import { useState } from 'react';
import { z } from 'zod';

export const useForm = <T>(initialValues: T) => {
  const [formValues, setFormValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<undefined | z.ZodIssue[]>();
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  type FormKeys = keyof T;

  const setFieldValue = (
    fieldName: FormKeys,
    value: boolean | number | string | undefined,
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    setIsSaved(false);
  };

  const getFieldValue = (fieldName: FormKeys): string => {
    return formValues[fieldName] as string;
  };

  const getFieldValueBoolean = (fieldName: FormKeys): boolean => {
    return formValues[fieldName] as boolean;
  };

  const getFieldValueNumber = (fieldName: FormKeys): number => {
    return formValues[fieldName] as number;
  };

  const getFieldErrors = (
    fieldName: FormKeys,
  ): string | string[] | undefined => {
    const x = errors?.filter((x) => x.path.includes(fieldName as string));
    return x && x.length > 0 ? x.map((x) => x.message) : undefined;
  };

  const hasError = (fieldName: FormKeys) => {
    return !getFieldErrors(fieldName);
  };

  const isFormValid = () => {
    return !errors || errors.length === 0;
  };

  // Handle field change
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id: fieldName, value } = event.target;
    if (!fieldName) {
      console.warn('No id found in event target');
    }
    setFieldValue(fieldName as FormKeys, value);
  };

  const handleClearField = (fieldName: FormKeys) => {
    setFieldValue(fieldName as FormKeys, '');
  };

  const handleClearAll = () => {
    setFormValues({} as T);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(undefined);
  };

  const handleReset = () => {
    setFormValues(initialValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(undefined);
  };

  const getDefaultFields = (fieldName: FormKeys) => {
    return {
      errorText: getFieldErrors(fieldName),
      id: `${fieldName as string}`,
      value: formValues[fieldName],
    };
  };

  const getDefaultPasswordFields = (fieldName: FormKeys, id: string) => {
    return {
      errorText: getFieldErrors(fieldName),
      id: `${fieldName as string} - ${id}`,
      maxLength: 60,
      onChange: handleChange,
      required: true,
      showCounter: true,
      value: formValues[fieldName],
    };
  };

  return {
    errors,
    formValues,
    getFieldErrors,
    getFieldValue,
    getFieldValueBoolean,
    getFieldValueNumber,
    handleChange,
    handleClearField,
    handleClearAll,
    handleReset,
    hasError,
    isFormValid,
    isProcessing,
    isSaved,
    setErrors,
    setFieldValue,
    setFormValues,
    setIsProcessing,
    setIsSaved,
  };
};
