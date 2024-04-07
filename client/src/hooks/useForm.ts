import { useCallback, useState } from 'react';
import { z } from 'zod';

export const useForm = <T>(defaultFormValues: T) => {
  const [errors, setErrors] = useState<z.ZodFormattedError<T> | null>(null);
  const [formValues, setFormValues] = useState<T>(defaultFormValues);
  type keys = keyof T;

  const setFieldValue = useCallback(
    (fieldName: keys, value: string | boolean | number | undefined) => {
      setFormValues((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    },
    [setFormValues],
  );

  // const hasError = (fieldName: keys) => {
  //   return getFieldErrors(fieldName) ? false : true;
  // };

  // const getFieldErrors = useCallback(
  //   (fieldName: keys) => {
  //     return errors && errors[fieldName]?._errors;
  //   },
  //   [errors],
  // );

  return {
    setFormValues,
    formValues,
    setErrors,
    errors,
    setFieldValue,
  };
};
