import { useCallback, useEffect, useMemo, useState } from 'react';
import { Menu, MenuEdit, MenuItem } from 'types';
import { REQUIRED_FIELD, ServiceUrl } from 'utils';
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
export type FormValues = z.infer<typeof pageSchema>;
export type keys = keyof FormValues;
export type sortByType = 'seq' | 'name';

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
  } = useFormArray<FormValues>();

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

  // Get the updates
  // We only want to submit the differences - not every record.
  const getUpdates = useCallback((): MenuEdit[] | undefined => {
    if (!localItems) {
      return undefined;
    }

    const ret: MenuEdit[] = [];

    formValues.forEach((item) => {
      // Find the original item
      const currItem = localItems.find((x) => x.localId === item.localId);
      if (currItem) {
        const tempId = parseInt(item.parentId);
        const tempSeq = parseInt(item.parentSortby);
        const currParent = currItem.parent;
        const updateItem =
          currParent.id !== tempId ||
          currParent.seq !== tempSeq ||
          currParent.sortby !== item.parentSortby;
        if (updateItem) {
          ret.push({
            id: currItem.id,
            parent: { ...currParent },
            newParent: {
              id: currParent.id !== tempId ? tempId : 0,
              seq: currParent.seq !== tempSeq ? tempSeq : 0,
              sortby:
                currParent.sortby !== item.parentSortby
                  ? (item.parentSortby as sortByType)
                  : 'name',
            },
          });
        }
      }
    });

    // Filter out empty array values
    return ret ? ret.filter((x) => x) : undefined;
  }, [formValues, localItems]);

  // Validate form
  // const validateForm = useCallback(() => {
  //   const result = safeParse<FormValues>(pageSchema, formValues);
  //   setErrors(result.error?.issues);
  //   return result.success;
  // }, [formValues, setErrors]);

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

  // const filter = (arr: MenuItem[] | undefined) => {
  //   const matches: MenuItem[] = [];
  //   if (!Array.isArray(arr)) return matches;
  //   arr.forEach((i) => {
  //     if (i.type !== 'page') {
  //       const { items, ...rest } = i;
  //       const childResults = filter(items);
  //       matches.push({ items: childResults, ...rest });
  //     }
  //   });
  //   return matches;
  // };

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
