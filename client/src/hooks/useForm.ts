import { useCallback, useState } from 'react';
import { z } from 'zod';

export const useForm = <T>(initialValues: T) => {
  const [formValues, setFormValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<undefined | z.ZodIssue[]>();
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  type keys = keyof T;

  const setFieldValue = useCallback(
    (fieldName: keys, value: boolean | number | string | undefined) => {
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
      const x = errors?.filter((x) => x.path.includes(fieldName as string));
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

  const isFormValid = () => {
    return !errors || errors.length === 0;
  };

  // Handle field change
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name: fieldName, value } = event.target;
      console.log('fieldName:', fieldName);
      console.log('value:', value);
      setFieldValue(fieldName as keys, value);
    },
    [setFieldValue],
  );

  const handleClear = () => {
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
    handleChange,
    handleClear,
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
