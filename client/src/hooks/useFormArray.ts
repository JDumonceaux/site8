import { useState } from 'react';

type IdType = {
  readonly lineId: number;
};

type FieldValue = boolean | null | number | string;

/**
 * Return type for useFormArray hook
 */
export type UseFormArrayReturn<T extends IdType> = {
  /** Clear all form items */
  clearForm: () => void;
  /** Current form values array */
  formValues: T[];
  /** Get field value for a specific line item */
  getFieldValue: (lineId: number, fieldName: keyof T) => string;
  /** Get all items with lineId */
  getIndex: () => IdType[];
  /** Get a specific item by lineId */
  getItem: (lineId: number) => null | T;
  /** Whether form has been saved (not dirty) */
  isSaved: boolean;
  /** Set a field value for a specific line item */
  setFieldValue: (
    lineId: number,
    fieldName: keyof T,
    value: FieldValue,
  ) => void;
  /** Set entire form values array */
  setFormValues: (values: T[]) => void;
  /** Set saved state */
  setIsSaved: (value: boolean) => void;
  /** Set or update a complete item */
  setItem: (lineId: number, item: T) => void;
};

/**
 * Custom hook for managing array-based form state
 *
 * Designed for forms with multiple items, each identified by a unique lineId.
 * Useful for todo lists, table rows, or any multi-item form.
 *
 * @template T - The item type (must extend IdType with lineId property)
 * @returns Form array state and handlers
 *
 * @example
 * ```typescript
 * type TodoItem = { lineId: number; text: string; done: boolean };
 * const { formValues, setFieldValue, getItem } = useFormArray<TodoItem>();
 * ```
 */
const useFormArray = <T extends IdType>(): UseFormArrayReturn<T> => {
  const [formValues, setFormValues] = useState<T[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(true);

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
    return item == null ? '' : String(item[fieldName]);
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

  const getIndex = (): IdType[] => formValues;

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
