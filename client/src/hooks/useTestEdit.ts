import { useCallback, useEffect, useMemo } from 'react';
import { Menu, MenuEdit } from 'types';
import { REQUIRED_FIELD, ServiceUrl } from 'utils';
import { z } from 'zod';
import { useAxios } from './Axios/useAxios';
import { useFormArray } from './useFormArray';

// Define Zod Shape
const pageSchema = z.object({
  localId: z.number(),
  id: z.number(),
  name: z.string().optional(),
  parent: z.string().min(1, REQUIRED_FIELD),
  seq: z.string(),
  sortby: z.string(),
  tempId: z.number(),
  type: z.string(),
});

// Create a type from the schema
export type FormType = z.infer<typeof pageSchema>;
export type keys = keyof FormType;
export type sortByType = 'seq' | 'name' | undefined;

const useTestEdit = () => {
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
  } = useFormArray<FormType>();

  // Get the data
  useEffect(() => {
    fetchData(ServiceUrl.ENDPOINT_MENUS_EDIT);
  }, [fetchData]);

  // Get the updates
  const getUpdates = useCallback((): MenuEdit[] | undefined => {
    if (!data?.items) {
      return undefined;
    }

    const temp: MenuEdit[] = [];
    formValues.forEach((item) => {
      const originalItem = data?.items?.find((x) => x.localId === item.localId);
      if (originalItem) {
        const x: MenuEdit = {
          ...originalItem,
          parent: {
            id: parseInt(item.parent),
            seq: parseInt(item.seq),
            sortby: item.sortby as sortByType,
          },
        };
        temp.push(x);
      }
    });

    // const ret = temp.filter(
    //   (x) =>
    //     x.newParent.id !== x.parent.id ||
    //     x.newParent.seq !== x.parent.seq ||
    //     x.newParent.sortby !== x.parent.sortby,
    // );
    const ret = temp;
    // Filter out empty array values
    return ret ? ret.filter((x) => x) : undefined;
  }, [data?.items, formValues]);

  // Validate form
  // const validateForm = useCallback(() => {
  //   const result = safeParse<FormType>(pageSchema, formValues);
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
    (localId: number, fieldName: keys) => {
      const field = fieldName + '-' + localId;
      return {
        id: field,
        value: getFieldValue(localId, fieldName),
        // errorText: getFieldErrors(fieldName),
        // hasError: hasError(fieldName),
        // value: formValues[fieldName],
      };
    },
    [getFieldValue],
  );

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

  const filteredData = data?.items;

  return useMemo(
    () => ({
      data: filteredData,
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
      filteredData,
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

export default useTestEdit;