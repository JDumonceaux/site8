import { useCallback, useMemo, useState } from 'react';

export type IdType = {
  readonly localId: number;
};

export const useFormArray = <T extends IdType>() => {
  //const [errors, setErrors] = useState<z.ZodIssue[] | undefined>(undefined);
  const [formValues, setFormValues] = useState<T[]>([]);

  // const [blankFormValues, setBlankFormValues] = useState<T extends IdType[]>(unknown as T[]);
  type keys = keyof T;
  // Does the data need to be saved?
  const [isSaved, setIsSaved] = useState<boolean>(true);
  // // Is the form saving?
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const setFieldValue = useCallback(
    (
      localId: number,
      fieldName: keys,
      value: string | boolean | number | undefined,
    ) => {
      const i = formValues.findIndex((x) => x.localId === localId);
      const newFormValues = [...formValues];
      if (i >= 0) {
        newFormValues[i] = { ...newFormValues[i], [fieldName]: value };
      } else {
        newFormValues.push({ localId, [fieldName]: value } as T);
      }
      setFormValues(newFormValues);
      setIsSaved(false);
    },
    [formValues],
  );

  const getFieldValue = useCallback(
    (localId: number, fieldName: keys) => {
      const rec = formValues.find((x) => x.localId === localId);
      if (!rec) {
        return '';
      }
      return rec[fieldName] || '';
    },
    [formValues],
  );
  const setItem = useCallback(
    (localId: number, item: T) => {
      const i = formValues.findIndex((x) => x.localId === localId);
      const newFormValues = [...formValues];
      if (i >= 0) {
        newFormValues[i] = { ...newFormValues[i], ...item };
      } else {
        newFormValues.push({ ...item, localId } as T);
      }
      setFormValues(newFormValues);
      setIsSaved(false);
    },
    [formValues],
  );

  const getItem = useCallback(
    (localId: number) => {
      const i = formValues.findIndex((x) => x.localId === localId);
      if (i < 0) {
        return undefined;
      }
      return formValues[i] as T;
    },
    [formValues],
  );

  // const getFieldErrors = useCallback(
  //   (fieldName: keys): string | string[] | undefined => {
  //     const x =
  //       errors && errors.filter((x) => x.path.includes(fieldName as string));
  //     return x && x.length > 0 ? x.map((x) => x.message) : undefined;
  //   },
  //   [errors],
  // );

  // const hasError = useCallback(
  //   (fieldName: keys) => {
  //     return !getFieldErrors(fieldName);
  //   },
  //   [getFieldErrors],
  // );

  // const isFormValid = useCallback(() => {
  //   return !errors || errors.length === 0;
  // }, [errors]);

  // Handle field change
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name: fieldName, value } = event.target;
      setFieldValue(0, fieldName as keys, value);
    },
    [setFieldValue],
  );

  // const handleClear = useCallback(() => {
  //   setFormValues(blankFormValues);
  //   setIsSaved(true);
  //   setIsProcessing(false);
  //   setErrors(undefined);
  // }, [setFormValues, blankFormValues]);

  const getDefaultProps = useCallback(
    (localId: number, fieldName: keys) => {
      const field = `${fieldName as string}-${localId}`;
      return {
        id: field,
        value: getFieldValue(localId, fieldName),
        onChange: handleChange,
        // errorText: getFieldErrors(fieldName),
        // hasError: hasError(fieldName),
        // value: formValues[fieldName],
      };
    },
    [getFieldValue, handleChange],
  );

  return useMemo(
    () => ({
      formValues,
      isSaved,
      isProcessing,
      setIsProcessing,
      handleChange,
      setIsSaved,
      getFieldValue,
      setFieldValue,
      setFormValues,
      getDefaultProps,
      getItem,
      setItem,
    }),
    [
      formValues,
      isSaved,
      isProcessing,
      handleChange,
      getFieldValue,
      setFieldValue,
      getDefaultProps,
      getItem,
      setItem,
    ],
  );
};
