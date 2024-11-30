import { useState } from 'react';

type IdType = {
  readonly lineId: number;
};

export const useFormArray = <T extends IdType>() => {
  const [formValues, setFormValues] = useState<T[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(true);

  const findItemIndex = (lineId: number): number => {
    return formValues.findIndex((x) => x.lineId === lineId);
  };

  const setFieldValue = (
    lineId: number,
    fieldName: keyof T,
    value: boolean | null | number | string,
  ) => {
    setFormValues((previous) => {
      const index = findItemIndex(lineId);
      const newFormValues = [...previous];
      if (index >= 0) {
        newFormValues[index] = {
          ...newFormValues[index],
          [fieldName]: value,
        };
      } else {
        newFormValues.push({ [fieldName]: value, lineId } as T);
      }
      return newFormValues;
    });
    setIsSaved(false);
  };

  const getFieldValue = (lineId: number, fieldName: keyof T): string => {
    const item = formValues.find((x) => x.lineId === lineId);
    return item ? (item[fieldName] as string) : '';
  };

  const setItem = (lineId: number, item: T) => {
    setFormValues((previous) => {
      const index = findItemIndex(lineId);
      const newFormValues = [...previous];
      if (index >= 0) {
        newFormValues[index] = { ...newFormValues[index], ...item };
      } else {
        newFormValues.push({ ...item, lineId } as T);
      }
      return newFormValues;
    });
    setIsSaved(false);
  };

  const getItem = (lineId: number): null | T => {
    const index = findItemIndex(lineId);
    return index >= 0 ? formValues[index] : null;
  };

  const getIndex = (): IdType[] => {
    return formValues.filter((x) => x.lineId);
  };

  return {
    formValues,
    getFieldValue,
    getIndex,
    getItem,
    isSaved,
    setFieldValue,
    setFormValues,
    setIsSaved,
    setItem,
  };
};
