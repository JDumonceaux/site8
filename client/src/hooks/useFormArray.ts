import { useState } from 'react';

type IdType = {
  readonly lineId: number;
};

type FieldValue = boolean | null | number | string;

const useFormArray = <T extends IdType>() => {
  const [formValues, setFormValues] = useState<T[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(true);

  const findItemIndex = (lineId: number): number =>
    formValues.findIndex((x) => x.lineId === lineId);

  const setFieldValue = (
    lineId: number,
    fieldName: keyof T,
    value: FieldValue,
  ) => {
    setFormValues((prev) => {
      const index = prev.findIndex((x) => x.lineId === lineId);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], [fieldName]: value };
        return updated;
      }
      return [...prev, { [fieldName]: value, lineId } as T];
    });
    setIsSaved(false);
  };

  const getFieldValue = (lineId: number, fieldName: keyof T): string => {
    const item = formValues.find((x) => x.lineId === lineId);
    return item ? String(item[fieldName]) : '';
  };

  const setItem = (lineId: number, item: T) => {
    setFormValues((prev) => {
      const index = prev.findIndex((x) => x.lineId === lineId);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], ...item };
        return updated;
      }
      return [...prev, item];
    });
    setIsSaved(false);
  };

  const getItem = (lineId: number): null | T => {
    const index = formValues.findIndex((x) => x.lineId === lineId);
    return index === -1 ? null : formValues[index];
  };

  const getIndex = (): IdType[] => formValues.filter((x) => Boolean(x.lineId));

  const clearForm = () => {
    setFormValues([]);
    setIsSaved(true);
  };

  return {
    clearForm,
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

export default useFormArray;
