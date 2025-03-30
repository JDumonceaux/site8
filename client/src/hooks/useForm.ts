import { useCallback, useState } from 'react';

import type { z } from 'zod';

type FormKeys<T> = keyof T;
type FieldValue = boolean | null | number | string;

const useForm = <T>(initialValues: T) => {
  const [formValues, setFormValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<null | z.ZodIssue[]>(null);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const setFieldValue = useCallback(
    (fieldName: FormKeys<T>, value: FieldValue) => {
      setFormValues((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
      setIsSaved(false);
    },
    [],
  );

  const getFieldValue = useCallback(
    (fieldName: FormKeys<T>): string => {
      const val = formValues[fieldName];
      return typeof val === 'string' ? val : '';
    },
    [formValues],
  );

  const getFieldValueBoolean = useCallback(
    (fieldName: FormKeys<T>): boolean => {
      const val = formValues[fieldName];
      return typeof val === 'boolean' ? val : false;
    },
    [formValues],
  );

  const getFieldValueNumber = useCallback(
    (fieldName: FormKeys<T>): number => {
      const val = formValues[fieldName];
      return typeof val === 'number' ? val : 0;
    },
    [formValues],
  );

  const getFieldErrors = useCallback(
    (fieldName: FormKeys<T>): null | string | string[] => {
      if (!errors) return null;
      const filteredErrors = errors.filter((issue) =>
        issue.path.includes(fieldName as string),
      );
      return filteredErrors.length > 0
        ? filteredErrors.map((issue) => issue.message)
        : null;
    },
    [errors],
  );

  const getDefaultProps = useCallback(
    (fieldName: FormKeys<T>) => ({
      'data-id': fieldName,
      'data-line': 0,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setFieldValue(fieldName, e.target.value);
      },
      value: getFieldValue(fieldName),
    }),
    [setFieldValue, getFieldValue],
  );

  const hasError = useCallback(
    (fieldName: FormKeys<T>): boolean => !!getFieldErrors(fieldName),
    [getFieldErrors],
  );

  const isFormValid = useCallback((): boolean => {
    return !errors || errors.length === 0;
  }, [errors]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      if (!id) {
        // eslint-disable-next-line no-console
        console.warn('No id found in event target');
        return;
      }
      setFieldValue(id as FormKeys<T>, value);
    },
    [setFieldValue],
  );

  const handleClearField = useCallback(
    (fieldName: FormKeys<T>) => {
      setFieldValue(fieldName, '');
    },
    [setFieldValue],
  );

  const handleClearAll = useCallback(() => {
    setFormValues({} as T);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(null);
  }, []);

  const handleReset = useCallback(() => {
    setFormValues(initialValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(null);
  }, [initialValues]);

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
