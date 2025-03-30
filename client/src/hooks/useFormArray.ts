import { useCallback, useMemo, useState } from 'react';

type IdType = {
  readonly lineId: number;
};

type FieldValue = boolean | null | number | string;

const useFormArray = <T extends IdType>() => {
  const [formValues, setFormValues] = useState<T[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(true);

  // Finds the index of the item with the given lineId.
  const findItemIndex = useCallback(
    (lineId: number): number =>
      formValues.findIndex((x) => x.lineId === lineId),
    [formValues],
  );

  // Updates a specific field of an item, or creates a new item if not found.
  const setFieldValue = useCallback(
    (lineId: number, fieldName: keyof T, value: FieldValue) => {
      setFormValues((prev) => {
        const index = findItemIndex(lineId);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = { ...updated[index], [fieldName]: value };
          return updated;
        }
        return [...prev, { [fieldName]: value, lineId } as T];
      });
      setIsSaved(false);
    },
    [findItemIndex],
  );

  // Retrieves the value of a field as a string for the given item.
  const getFieldValue = useCallback(
    (lineId: number, fieldName: keyof T): string => {
      const item = formValues.find((x) => x.lineId === lineId);
      return item ? String(item[fieldName]) : '';
    },
    [formValues],
  );

  // Replaces or adds an entire item.
  const setItem = useCallback(
    (lineId: number, item: T) => {
      setFormValues((prev) => {
        const index = findItemIndex(lineId);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = { ...updated[index], ...item };
          return updated;
        }
        return [...prev, item];
      });
      setIsSaved(false);
    },
    [findItemIndex],
  );

  // Returns the item with the specified lineId, or null if not found.
  const getItem = useCallback(
    (lineId: number): null | T => {
      const index = findItemIndex(lineId);
      return index === -1 ? null : formValues[index];
    },
    [formValues, findItemIndex],
  );

  // Returns all items that have a truthy lineId.
  const getIndex = useCallback((): IdType[] => {
    return formValues.filter((x) => Boolean(x.lineId));
  }, [formValues]);

  // Resets the form array to an empty state.
  const clearForm = useCallback(() => {
    setFormValues([]);
  }, []);

  return useMemo(
    () => ({
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
    }),
    [
      formValues,
      isSaved,
      getFieldValue,
      getIndex,
      getItem,
      setFieldValue,
      setFormValues,
      setIsSaved,
      setItem,
      clearForm,
    ],
  );
};

export default useFormArray;
