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
    setFormValues(blankFormValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(undefined);
  }, [setFormValues, blankFormValues]);

  const handleReset = useCallback(() => {
    setFormValues(initialFormValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(undefined);
  }, [initialFormValues, setFormValues]);

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
      hasError,
      isFormValid,
      getFieldErrors,
      getDefaultFields,
      setIsProcessing,
      handleChange,
      handleClear,
      handleReset,
      getFieldValue,
      setIsSaved,
      setErrors,
      setFieldValue,
      setFormValues,
      setInitialFormValues,
      setBlankFormValues,
      getDefaultPasswordFields,
    }),
    [
      formValues,
      errors,
      isSaved,
      isProcessing,
      hasError,
      isFormValid,
      getFieldErrors,
      getDefaultFields,
      handleChange,
      handleClear,
      handleReset,
      getFieldValue,
      setFieldValue,
      setFormValues,
      getDefaultPasswordFields,
    ],
  );
};
