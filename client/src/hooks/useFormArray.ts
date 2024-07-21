import { ChangeEvent, useCallback, useMemo, useState } from 'react';

export type IdType = {
  readonly localId: number;
};

export const useFormArray = <T extends IdType>() => {
  const [formValues, setFormValues] = useState<T[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const findItemIndex = useCallback(
    (localId: number): number => {
      return formValues.findIndex((x) => x.localId === localId);
    },
    [formValues],
  );

  const setFieldValue = useCallback(
    (
      localId: number,
      fieldName: keyof T,
      value: string | boolean | number | undefined,
    ) => {
      setFormValues((prev) => {
        const index = findItemIndex(localId);
        const newFormValues = [...prev];
        if (index >= 0) {
          newFormValues[index] = {
            ...newFormValues[index],
            [fieldName]: value,
          };
        } else {
          newFormValues.push({ localId, [fieldName]: value } as T);
        }
        return newFormValues;
      });
      setIsSaved(false);
    },
    [findItemIndex],
  );

  const getFieldValue = useCallback(
    (localId: number, fieldName: keyof T): string | undefined => {
      const item = formValues.find((x) => x.localId === localId);
      return item ? (item[fieldName] as string) : '';
    },
    [formValues],
  );

  const setItem = useCallback(
    (localId: number, item: T) => {
      setFormValues((prev) => {
        const index = findItemIndex(localId);
        const newFormValues = [...prev];
        if (index >= 0) {
          newFormValues[index] = { ...newFormValues[index], ...item };
        } else {
          newFormValues.push({ ...item, localId } as T);
        }
        return newFormValues;
      });
      setIsSaved(false);
    },
    [findItemIndex],
  );

  const getItem = useCallback(
    (localId: number): T | undefined => {
      const index = findItemIndex(localId);
      return index >= 0 ? formValues[index] : undefined;
    },
    [formValues, findItemIndex],
  );

  const handleChange = useCallback(
    (
      localId: number,
      fieldName: keyof T,
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setFieldValue(localId, fieldName, event.target.value);
    },
    [setFieldValue],
  );

  const getDefaultProps = useCallback(
    (localId: number, fieldName: keyof T) => ({
      id: `${fieldName as string}-(${localId})`,
      value: getFieldValue(localId, fieldName),
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        handleChange(localId, fieldName, e),
    }),
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
