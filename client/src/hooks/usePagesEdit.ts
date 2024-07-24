import { REQUIRED_FIELD, ServiceUrl } from 'lib/utils/constants';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Menu, MenuEdit, MenuItem } from 'types';
import { z } from 'zod';
import { useAxios } from './Axios/useAxios';
import { useFormArray } from './useFormArray';

// Define Zod Shape
const pageSchema = z.object({
  localId: z.number(),
  id: z.number(),
  name: z.string().optional(),
  parentId: z.string().min(1, REQUIRED_FIELD),
  parentSeq: z.string(),
  parentSortby: z.string(),
  type: z.string(),
});

// Create a type from the schema
type FormType = z.infer<typeof pageSchema>;
type keys = keyof FormType;
type SortByType = 'seq' | 'name';

const usePagesEdit = () => {
  const { data, fetchData, isLoading, error } = useAxios<Menu>();
  const [localItems, setLocalItems] = useState<MenuItem[] | undefined>();
  const { patchData } = useAxios<MenuEdit[]>();

  // Create a form
  const {
    formValues,
    isSaved,
    isProcessing,
    getDefaultProps,
    setIsProcessing,
    setFieldValue,
    getFieldValue,
    setIsSaved,
    setFormValues,
  } = useFormArray<FormType>();

  // Get the data
  useEffect(() => {
    fetchData(ServiceUrl.ENDPOINT_MENUS_EDIT);
  }, [fetchData]);

  // Save to local - adding local index
  useEffect(() => {
    setLocalItems(
      data?.items?.map((x, index) => ({ ...x, localId: index + 1 })),
    );
  }, [data?.items, setLocalItems]);

  const mapFormTypeToMenuEdit = useCallback(
    (item: FormType): MenuEdit | undefined => {
      if (!item) {
        return undefined;
      }
      return {
        id: item.id,
        // Temporary filler
        priorParent: { id: 0, seq: 0, sortby: 'name' as SortByType },
        newParent: {
          id: Number.isNaN(item.parentId) ? 0 : Number(item.parentId),
          seq: Number.isNaN(item.parentSeq) ? 0 : Number(item.parentSeq),
          sortby: item.parentSortby as SortByType,
        },
      };
    },
    [],
  );

  const shouldUpdate = useCallback(
    (
      originalItem: MenuItem | undefined,
      newItem: MenuEdit | undefined,
    ): boolean => {
      if (!originalItem || !newItem) {
        return false;
      }
      const { parentItem } = originalItem;
      const { newParent } = newItem;
      if (!parentItem && !newParent) {
        return false;
      }
      if (parent && !newParent) {
        return false;
      }
      const { id, seq, sortby } = newParent;
      if (id && Number.isInteger(id) && id > -1) {
        if (!parentItem.id) {
          return true;
        }
        if (parentItem.id !== id) {
          return true;
        }
      }
      if (seq && Number.isInteger(seq) && seq > -1) {
        if (!parentItem.seq) {
          return true;
        }
        if (parentItem.seq !== seq) {
          return true;
        }
      }
      if (sortby && sortby.length > 0 && parentItem.sortby !== sortby) {
        return true;
      }
      return false;
    },
    [],
  );

  // Get the updates
  // We only want to submit the differences - not every record.
  const getUpdates = useCallback((): MenuEdit[] | undefined => {
    if (!localItems) {
      return undefined;
    }

    const ret: MenuEdit[] = [];
    formValues.forEach((item) => {
      // Map item
      const tempItem = mapFormTypeToMenuEdit(item);

      // Find the original item
      const currItem = localItems.find((x) => x.localId === item.localId);

      const newItem =
        tempItem && currItem?.parentItem
          ? { ...tempItem, priorParent: { ...currItem?.parentItem } }
          : tempItem;

      if (shouldUpdate(currItem, newItem)) {
        if (newItem) {
          ret.push(newItem);
        }
      }
    });

    // Filter out empty array values
    return ret ? ret.filter((x) => x) : undefined;
  }, [formValues, localItems, mapFormTypeToMenuEdit, shouldUpdate]);

  // Handle save
  const submitForm = useCallback(async () => {
    const data = getUpdates();
    if (!data) {
      return false;
    }
    setIsProcessing(true);
    const result = await patchData(`${ServiceUrl.ENDPOINT_MENUS}`, data);
    setIsProcessing(false);
    setIsSaved(result);
    return result;
  }, [getUpdates, patchData, setIsProcessing, setIsSaved]);

  const handleChange = useCallback(
    (id: number, fieldName: keys, value: string) => {
      setFieldValue(id, fieldName, value);
    },
    [setFieldValue],
  );

  const handleSave = useCallback(async () => {
    const ret = await submitForm();
    return ret;
  }, [submitForm]);

  const filteredData = localItems;

  return useMemo(
    () => ({
      data: filteredData,
      pageSchema,
      isProcessing,
      isLoading,
      error,
      isSaved,
      getFieldValue,
      getDefaultProps,
      setFieldValue,
      handleChange,
      handleSave,
      setFormValues,
    }),
    [
      filteredData,
      isProcessing,
      isLoading,
      error,
      isSaved,
      getFieldValue,
      getDefaultProps,
      setFieldValue,
      handleChange,
      handleSave,
      setFormValues,
    ],
  );
};

export default usePagesEdit;
