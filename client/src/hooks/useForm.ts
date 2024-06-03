import { useCallback, useMemo, useState } from 'react';
import { unknown, z } from 'zod';

export const useForm = <T>(initialValues: T) => {
  const [errors, setErrors] = useState<z.ZodIssue[] | undefined>(undefined);
  const [formValues, setFormValues] = useState<T>(initialValues);
  const [initialFormValues, setInitialFormValues] = useState<T>(initialValues);
  const [blankFormValues, setBlankFormValues] = useState<T>(unknown as T);
  type keys = keyof T;
  // Does the data need to be saved?
  const [isSaved, setIsSaved] = useState<boolean>(true);
  // Is the form saving?
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

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

  const setAllValues = useCallback(
    (value: T) => {
      setFormValues(value);
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
    setAllValues(blankFormValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(undefined);
  }, [setAllValues, blankFormValues]);

  const handleReset = useCallback(() => {
    setAllValues(initialFormValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(undefined);
  }, [initialFormValues, setAllValues]);

  return useMemo(
    () => ({
      formValues,
      errors,
      isSaved,
      isProcessing,
      hasError,
      isFormValid,
      getFieldErrors,
      setIsProcessing,
      handleChange,
      handleClear,
      handleReset,
      getFieldValue,
      setIsSaved,
      setErrors,
      setFieldValue,
      setAllValues,
      setInitialFormValues,
      setBlankFormValues,
    }),
    [
      formValues,
      errors,
      isSaved,
      isProcessing,
      hasError,
      isFormValid,
      getFieldErrors,
      handleChange,
      handleClear,
      handleReset,
      getFieldValue,
      setFieldValue,
      setAllValues,
    ],
  );
};
