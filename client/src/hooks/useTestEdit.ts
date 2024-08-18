import { REQUIRED_FIELD, ServiceUrl } from 'lib/utils/constants';
import { useCallback, useEffect, useMemo } from 'react';
import { Menu, MenuEdit } from 'types';
import { z } from 'zod';

import { useAxios } from './Axios/useAxios';
import { useFormArray } from './useFormArray';

export type sortByType = 'name' | 'seq';

// Define Zod Shape
const pageSchema = z.object({
  id: z.number(),
  localId: z.number(),
  name: z.string().optional(),
  parent: z.string().min(1, REQUIRED_FIELD),
  seq: z.string(),
  sortby: z.string(),
  tempId: z.number(),
  type: z.string(),
});

// Create a type from the schema
type FormType = z.infer<typeof pageSchema>;
type keys = keyof FormType;

const useTestEdit = () => {
  const { data, error, fetchData, isLoading } = useAxios<Menu>();
  const { patchData } = useAxios<MenuEdit[]>();

  // Create a form
  const {
    formValues,
    getFieldValue,
    isProcessing,
    isSaved,
    setFieldValue,
    setFormValues,
    setIsProcessing,
    setIsSaved,
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

    const returnValue: MenuEdit[] = [];
    for (const item of formValues) {
      const originalItem = data?.items?.find((x) => x.localId === item.localId);
      if (originalItem) {
        const x: MenuEdit = {
          ...originalItem,
          newParent: {
            id: 0,
            seq: 0,
            sortby: 'name',
          },
          priorParent: {
            id: Number.parseInt(item.parent),
            seq: Number.parseInt(item.seq),
            sortby: item.sortby as sortByType,
          },
        };
        returnValue.push(x);
      }
    }

    // Filter out empty array values
    return returnValue ? returnValue.filter(Boolean) : undefined;
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
    return await submitForm();
  }, [submitForm]);

  const getStandardInputTextAttributes = useCallback(
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
      error,
      getFieldValue,
      getStandardInputTextAttributes,
      handleChange,
      handleSave,
      isLoading,
      isProcessing,
      isSaved,
      pageSchema,
      setFieldValue,
      setFormValues,
    }),
    [
      filteredData,
      isProcessing,
      isLoading,
      error,
      isSaved,
      getFieldValue,
      getStandardInputTextAttributes,
      setFieldValue,
      handleChange,
      handleSave,
      setFormValues,
    ],
  );
};

export default useTestEdit;
