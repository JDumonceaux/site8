import { useState } from 'react';
import { z } from 'zod';

export const useForm = <T>(initialValues: T) => {
  const [formValues, setFormValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<undefined | z.ZodIssue[]>();
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  type keys = keyof T;

  const setFieldValue = (
    fieldName: keys,
    value: boolean | number | string | undefined,
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    setIsSaved(false);
  };

  const getFieldValue = (fieldName: keys): string => {
    return formValues[fieldName] as string;
  };

  const getFieldValueBoolean = (fieldName: keys): boolean => {
    return formValues[fieldName] as boolean;
  };

  const getFieldValueNumber = (fieldName: keys): number => {
    return formValues[fieldName] as number;
  };

  const getFieldErrors = (fieldName: keys): string | string[] | undefined => {
    const x = errors?.filter((x) => x.path.includes(fieldName as string));
    return x && x.length > 0 ? x.map((x) => x.message) : undefined;
  };

  const hasError = (fieldName: keys) => {
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
    setFieldValue(fieldName as keys, value);
  };

  const handleClearField = (fieldName: keys) => {
    setFieldValue(fieldName as keys, '');
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

  const getDefaultFields = (fieldName: keys) => {
    return {
      errorText: getFieldErrors(fieldName),
      id: `${fieldName as string}`,
      value: formValues[fieldName],
    };
  };

  const getDefaultPasswordFields = (fieldName: keys, id: string) => {
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
    getDefaultFields,
    getDefaultPasswordFields,
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
