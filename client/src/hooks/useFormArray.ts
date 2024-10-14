import { ChangeEvent, useState } from 'react';

type IdType = {
  readonly localId: number;
};

export const useFormArray = <T extends IdType>() => {
  const [formValues, setFormValues] = useState<T[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(true);


  const findItemIndex = (localId: number): number => {
    return formValues.findIndex((x) => x.localId === localId);
  };

  const setFieldValue = (
    localId: number,
    fieldName: keyof T,
    value: boolean | number | string | undefined,
  ) => {
    setFormValues((previous) => {
      const index = findItemIndex(localId);
      const newFormValues = [...previous];
      if (index >= 0) {
        newFormValues[index] = {
          ...newFormValues[index],
          [fieldName]: value,
        };
      } else {
        newFormValues.push({ [fieldName]: value, localId } as T);
      }
      return newFormValues;
    });
    setIsSaved(false);
  };

  const getFieldValue = (
    localId: number,
    fieldName: keyof T,
  ): string => {
    const item = formValues.find((x) => x.localId === localId);
    return item ? (item[fieldName] as string) : '';
  };

  const setItem = (localId: number, item: T) => {
    setFormValues((previous) => {
      const index = findItemIndex(localId);
      const newFormValues = [...previous];
      if (index >= 0) {
        newFormValues[index] = { ...newFormValues[index], ...item };
      } else {
        newFormValues.push({ ...item, localId } as T);
      }
      return newFormValues;
    });
    setIsSaved(false);
  };

  const getItem = (localId: number): T | undefined => {
    const index = findItemIndex(localId);
    return index >= 0 ? formValues[index] : undefined;
  };

  return {
    formValues,
    getFieldValue,
    getItem,
    isSaved,
    setFieldValue,
    setFormValues,
    setIsSaved,
    setItem,
  };
};
