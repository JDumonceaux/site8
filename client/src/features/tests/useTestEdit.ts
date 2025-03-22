import { useCallback } from 'react';

import { REQUIRED_FIELD, ServiceUrl } from 'lib/utils/constants';
import type { MenuEdit } from 'types';
import { z } from 'zod';

import useTestMenus from './useTestMenus';
import { useAxios } from '../../hooks/Axios/useAxios';
import useFormArray from '../../hooks/useFormArray';

export type sortByType = 'name' | 'seq';

// Define Zod Shape
const pageSchema = z.object({
  id: z.number(),
  lineId: z.number(),
  name: z.string().optional(),
  parent: z.string().min(1, REQUIRED_FIELD),
  seq: z.string(),
  sortby: z.string(),
  tempId: z.number(),
  type: z.string(),
});

// Create a type from the schema
type FormType = z.infer<typeof pageSchema>;
type FormKeys = keyof FormType;

const useTestEdit = () => {
  const { data, isError, isPending } = useTestMenus();

  const { patchData } = useAxios<MenuEdit[]>();

  // Create a form
  const {
    formValues,
    getFieldValue,
    isSaved,
    setFieldValue,
    setFormValues,
    setIsSaved,
  } = useFormArray<FormType>();

  // Get the updates
  const getUpdates = useCallback((): MenuEdit[] | null => {
    if (!data?.items) {
      return null;
    }

    const returnValue: MenuEdit[] = [];
    for (const item of formValues) {
      const originalItem = data.items.find((x) => x.lineId === item.lineId);
      if (originalItem) {
        const x: MenuEdit = {
          ...originalItem,
          newParent: {
            id: 0,
            seq: 0,
            sortby: 'name',
          },
          priorParent: {
            id: Number.parseInt(item.parent, 10),
            seq: Number.parseInt(item.seq, 10),
            sortby: item.sortby as sortByType,
          },
        };
        returnValue.push(x);
      }
    }

    // Filter out empty array values
    return returnValue.filter(Boolean);
  }, [data?.items, formValues]);

  // Validate form
  // const validateForm = useCallback(() => {
  //   const result = safeParse<FormType>(pageSchema, formValues);
  //   setErrors(result.error?.issues);
  //   return result.success;
  // }, [formValues, setErrors]);

  // Handle save
  const submitForm = useCallback(async () => {
    const updates = getUpdates();
    if (!updates) {
      return false;
    }
    // setIsProcessing(true);
    const result = await patchData(ServiceUrl.ENDPOINT_MENUS, updates);
    // setIsProcessing(false);
    setIsSaved(result);
    return result;
  }, [getUpdates, patchData, setIsSaved]);

  const handleChange = useCallback(
    (id: number, fieldName: FormKeys, value: string) => {
      setFieldValue(id, fieldName, value);
    },
    [setFieldValue],
  );

  const handleSave = useCallback(async () => {
    return submitForm();
  }, [submitForm]);

  const getStandardInputTextAttributes = useCallback(
    (lineId: number, fieldName: FormKeys) => {
      const field = `${fieldName}-${lineId}`;
      return {
        id: field,
        value: getFieldValue(lineId, fieldName),
        // errorText: getFieldErrors(fieldName),
        // hasError: hasError(fieldName),
        // value: formValues[fieldName],
      };
    },
    [getFieldValue],
  );

  // const filter = (arr: MenuItem[] | null) => {
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

  return {
    data: filteredData,
    getFieldValue,
    getStandardInputTextAttributes,
    handleChange,
    handleSave,
    isError,
    isPending,
    isSaved,
    pageSchema,
    setFieldValue,
    setFormValues,
  };
};

export default useTestEdit;
