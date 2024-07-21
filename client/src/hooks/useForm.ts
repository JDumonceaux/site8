import { useCallback, useMemo, useState } from 'react';
import { z } from 'zod';

export const useForm = <T>(initialValues: T) => {
  const [formValues, setFormValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<z.ZodIssue[] | undefined>(undefined);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  type keys = keyof T;

  const setFieldValue = useCallback(
    (fieldName: keys, value: string | boolean | number | undefined) => {
      setFormValues((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
      setIsSaved(false);
    },
    [setFormValues],
  );

  const getFieldValue = useCallback(
    (fieldName: keys): string => {
      return formValues[fieldName] as string;
    },
    [formValues],
  );

  const getFieldErrors = useCallback(
    (fieldName: keys): string | string[] | undefined => {
      const x =
        errors && errors.filter((x) => x.path.includes(fieldName as string));
      return x && x.length > 0 ? x.map((x) => x.message) : undefined;
    },
    [errors],
  );

  const hasError = useCallback(
    (fieldName: keys) => {
      return !getFieldErrors(fieldName);
    },
    [getFieldErrors],
  );

  const isFormValid = useCallback(() => {
    return !errors || errors.length === 0;
  }, [errors]);

  // Handle field change
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name: fieldName, value } = event.target;
      setFieldValue(fieldName as keys, value);
    },
    [setFieldValue],
  );

  const handleClear = useCallback(() => {
    setFormValues({} as T);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(undefined);
  }, [setFormValues]);

  const handleReset = useCallback(() => {
    setFormValues(initialValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(undefined);
  }, [initialValues, setFormValues]);

  const getDefaultFields = useCallback(
    (fieldName: keys) => {
      return {
        id: `${fieldName as string}`,
        errorText: getFieldErrors(fieldName),
        hasError: hasError(fieldName),
        value: formValues[fieldName],
      };
    },
    [getFieldErrors, hasError, formValues],
  );

  const getDefaultPasswordFields = useCallback(
    (fieldName: keys, id: string) => {
      return {
        id: `${fieldName as string} - ${id}`,
        errorText: getFieldErrors(fieldName),
        hasError: hasError(fieldName),
        value: formValues[fieldName],
        maxLength: 60,
        onChange: handleChange,
        required: true,
        showCounter: true,
      };
    },
    [getFieldErrors, hasError, formValues, handleChange],
  );

  return useMemo(
    () => ({
      formValues,
      errors,
      isSaved,
      isProcessing,
      setFieldValue,
      getFieldValue,
      getFieldErrors,
      hasError,
      isFormValid,
      handleChange,
      handleClear,
      handleReset,
      getDefaultFields,
      getDefaultPasswordFields,
      setErrors,
      setIsSaved,
      setIsProcessing,
      setFormValues,
    }),
    [
      formValues,
      errors,
      isSaved,
      isProcessing,
      setFieldValue,
      getFieldValue,
      getFieldErrors,
      hasError,
      isFormValid,
      handleChange,
      handleClear,
      handleReset,
      getDefaultFields,
      getDefaultPasswordFields,
      setFormValues,
    ],
  );
};
