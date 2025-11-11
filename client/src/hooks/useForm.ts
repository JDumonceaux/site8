import { useState } from 'react';

import type { z } from 'zod';

type FormKeys<T> = keyof T;
type FieldValue = boolean | null | number | string;

const useForm = <T>(initialValues: T) => {
  const [formValues, setFormValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<null | z.core.$ZodIssue[]>(null);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const setFieldValue = (fieldName: FormKeys<T>, value: FieldValue) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    setIsSaved(false);
  };

  const getFieldValue = (fieldName: FormKeys<T>): string => {
    const val = formValues[fieldName];
    return typeof val === 'string' ? val : '';
  };

  const getFieldValueBoolean = (fieldName: FormKeys<T>): boolean => {
    const val = formValues[fieldName];
    return typeof val === 'boolean' ? val : false;
  };

  const getFieldValueNumber = (fieldName: FormKeys<T>): number => {
    const val = formValues[fieldName];
    return typeof val === 'number' ? val : 0;
  };

  const getFieldErrors = (fieldName: FormKeys<T>): null | string | string[] => {
    if (!errors) return null;
    const filteredErrors = errors.filter((issue) =>
      issue.path.includes(fieldName as string),
    );
    return filteredErrors.length > 0
      ? filteredErrors.map((issue) => issue.message)
      : null;
  };

  const getDefaultProps = (fieldName: FormKeys<T>) => ({
    'data-id': fieldName,
    'data-line': 0,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setFieldValue(fieldName, e.target.value);
    },
    value: getFieldValue(fieldName),
  });

  const hasError = (fieldName: FormKeys<T>): boolean =>
    !!getFieldErrors(fieldName);

  const isFormValid = (): boolean => {
    return !errors || errors.length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    if (!id) {
      console.warn('No id found in event target');
      return;
    }
    setFieldValue(id as FormKeys<T>, value);
  };

  const handleClearField = (fieldName: FormKeys<T>) => {
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
