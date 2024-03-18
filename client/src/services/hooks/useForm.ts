import { useCallback, useState } from 'react';
import { z } from 'zod';

export const useForm = <T>(defaultFormValues: T) => {
  const [errors, setErrors] = useState<z.ZodFormattedError<T> | null>(null);
  const [formValues, setFormValues] = useState<T>(defaultFormValues);

  const setFieldValue = useCallback(
    (fieldName: string, value: string | boolean | number | undefined) => {
      setFormValues((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    },
    [setFormValues],
  );

  return {
    setFormValues,
    formValues,
    setErrors,
    errors,
    setFieldValue,
  };
};
