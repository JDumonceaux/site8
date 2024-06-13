import { useCallback, useEffect, useMemo } from 'react';
import { REQUIRED_FIELD, ServiceUrl } from 'utils';
import { z } from 'zod';
import { useFormArray } from './useFormArray';
import { useAxios } from './Axios/useAxios';
import { Menu, MenuEdit, MenuItem } from 'types';

// Define Zod Shape
const pageSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  parent: z.string().min(1, REQUIRED_FIELD),
  seq: z.string(),
  sortby: z.string(),
  tempId: z.number(),
  type: z.string(),
});

// Create a type from the schema
export type FormValues = z.infer<typeof pageSchema>;
export type keys = keyof FormValues;
export type sortByType = 'seq' | 'name' | undefined;

const usePagesEdit = () => {
  const { data, fetchData, isLoading, error } = useAxios<Menu>();
  const { patchData } = useAxios<MenuEdit[]>();

  // Create a form
  const {
    formValues,
    isSaved,
    isProcessing,
    setIsProcessing,
    setFieldValue,
    getFieldValue,
    setIsSaved,
    setFormValues,
  } = useFormArray<FormValues>();

  const flattenArray = useCallback((items: MenuItem[] | undefined) => {
    if (!items) {
      return undefined;
    }
    const ret: MenuItem[] = [];
    items.forEach((x) => {
      ret.push(x);
      if (x.items) {
        const y = flattenArray(x.items);
        if (y) {
          ret.push(...y);
        }
      }
    });
    return ret ? ret.sort((a, b) => a.tempId - b.tempId) : undefined;
  }, []);

  // Get the data
  useEffect(() => {
    fetchData(ServiceUrl.ENDPOINT_MENUS_EDIT);
  }, [fetchData]);

  // Get the updates
  const getUpdates = useCallback((): MenuEdit[] | undefined => {
    if (!data?.flat) {
      return undefined;
    }

    const temp: MenuEdit[] = [];
    formValues.forEach((item) => {
      // Match on TempId = Id
      const originalItem = data.flat?.find((x) => x.tempId === item.id);
      if (originalItem) {
        const x: MenuEdit = {
          ...originalItem,
          newParentId: parseInt(item.parent),
          newSeq: parseInt(item.seq),
          newSortby: item.sortby as sortByType,
        };
        temp.push(x);
      }
    });

    const ret = temp.filter(
      (x) =>
        x.newParentId !== x.parentId ||
        x.newSeq !== x.seq ||
        x.newSortby !== x.sortby,
    );
    // Filter out empty array values
    return ret ? ret.filter((x) => x) : undefined;
  }, [data?.flat, formValues]);

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

  const getStandardTextInputAttributes = useCallback(
    (id: number, fieldName: keys) => {
      const field = fieldName + '-' + id;
      return {
        id: field,
        value: getFieldValue(id, fieldName),
        // errorText: getFieldErrors(fieldName),
        // hasError: hasError(fieldName),
        // value: formValues[fieldName],
      };
    },
    [getFieldValue],
  );

  return useMemo(
    () => ({
      data: data?.items,
      dataFlat: data?.flat,
      pageSchema,
      isProcessing,
      isLoading,
      error,
      isSaved,
      getFieldValue,
      getStandardTextInputAttributes,
      setFieldValue,
      handleChange,
      handleSave,
      setFormValues,
    }),
    [
      data?.items,
      data?.flat,
      isProcessing,
      isLoading,
      error,
      isSaved,
      getFieldValue,
      getStandardTextInputAttributes,
      setFieldValue,
      handleChange,
      handleSave,
      setFormValues,
    ],
  );
};

export default usePagesEdit;
