import { useState } from 'react';

import type { z } from 'zod';

const useForm = <T>(initialValues: T) => {
  const [formValues, setFormValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<null | z.ZodIssue[]>();
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  type FormKeys = keyof T;

  const setFieldValue = (
    fieldName: FormKeys,
    value: boolean | null | number | string,
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

  const getFieldErrors = (fieldName: FormKeys): null | string | string[] => {
    const filteredErrors = errors?.filter((x) =>
      x.path.includes(fieldName as string),
    );

    return filteredErrors && filteredErrors.length > 0
      ? filteredErrors.map((x) => x.message)
      : null;
  };

  const getDefaultProps = (fieldName: FormKeys) => ({
    'data-id': fieldName,
    'data-line': 0,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setFieldValue(fieldName, e.target.value);
    },
    value: getFieldValue(fieldName),
  });

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
      // eslint-disable-next-line no-console
      console.warn('No id found in event target');
    }
    setFieldValue(fieldName as FormKeys, value);
  };

  const handleClearField = (fieldName: FormKeys) => {
    setFieldValue(fieldName, '');
  };

  const handleClearAll = () => {
    setFormValues({} as T);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(null);
  };

  const handleReset = () => {
    setFormValues(initialValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(null);
  };

  return {
    errors,
    formValues,
    getDefaultProps,
    getFieldErrors,
    getFieldValue,
    getFieldValueBoolean,
    getFieldValueNumber,
    handleChange,
    handleClearAll,
    handleClearField,
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

export default useForm;
