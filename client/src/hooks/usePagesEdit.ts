import { useCallback, useEffect, useMemo, useState } from 'react';
import { REQUIRED_FIELD, ServiceUrl } from 'utils';
import { z } from 'zod';
import { useFormArray } from './useFormArray';
import { useAxios } from './Axios/useAxios';

import { Menu, MenuEdit, Page } from 'services/types';

// Define Zod Shape
const pageSchema = z.object({
  id: z.number(),
  parent: z.string().min(1, REQUIRED_FIELD),
  seq: z.number(),
  sortby: z.string(),
});

// Create a type from the schema
export type FormValues = z.infer<typeof pageSchema>;
export type keys = keyof FormValues;

const usePagesEdit = () => {
  const { data, fetchData, isLoading, error } = useAxios<Menu>();
  const [dataFlat, setDataFlat] = useState<Page[] | undefined>(undefined);
  const { patchData } = useAxios<MenuEdit[]>();

  // Get the data
  useEffect(() => {
    fetchData(ServiceUrl.ENDPOINT_MENUS_EDIT);
  }, [fetchData]);

  // Return default form values
  const initialFormValues: FormValues = useMemo(
    () => ({
      id: 0,
      parent: '',
      seq: 0,
      sortby: '',
    }),
    [],
  );

  // Create a form
  const {
    formValues,
    isSaved,
    isProcessing,
    setIsProcessing,
    setFieldValue,
    setAllValues,
    getItem,
    setIsSaved,
  } = useFormArray<FormValues>(initialFormValues);

  const getFieldValue = useCallback(
    (id: number, fieldName: keys) => {
      const i = getItem(id);
      if (!i) {
        return undefined;
      }
      return i[fieldName as keys];
    },
    [getItem],
  );

  // Map page to form values
  const mapPageToFormValues = useCallback(
    (items: Page[] | undefined): FormValues[] | undefined => {
      if (!items) {
        return undefined;
      }

      const ret = items.map((x) => {
        return {
          id: x.id,
          //parent: x.parentId.toString(),
          parent: '0',
          seq: x.seq,
          sortby: x.sortby,
        };
      });
      return ret;
    },
    [],
  );

  // Update the form values when the data changes
  useEffect(() => {
    setDataFlat(data?.items);
  }, [data?.items]);

  // Map data to form values
  useEffect(() => {
    setAllValues(mapPageToFormValues(dataFlat) ?? []);
  }, [dataFlat, setAllValues, mapPageToFormValues]);

  // Get the updates
  const getUpdates = useCallback((): MenuEdit[] | undefined => {
    if (!dataFlat) {
      return undefined;
    }

    const ret: MenuEdit[] = [];
    formValues.forEach((item) => {
      const originalItem = dataFlat.find((x) => x.id === item.id);
      if (originalItem) {
        const newParent =
          item.parent !== originalItem.parentId?.toString()
            ? parseInt(item.parent)
            : undefined;
        const newSeq = item.seq !== originalItem.seq ? item.seq : undefined;
        const newSortby =
          item.sortby !== originalItem.sortby
            ? item.sortby === 'name'
              ? 'name'
              : 'seq'
            : undefined;

        const y = () => {
          if (newParent || newSeq || newSortby) {
            return {
              id: item.id,
              parentId: newParent,
              seq: newSeq,
              sortby: newSortby,
              type: originalItem.type,
            };
          }
          return undefined;
        };
        if (y) {
          ret.push(y() as MenuEdit);
        }
      } else {
        ret.push({
          id: item.id,
          parentId: parseInt(item.parent),
          seq: item.seq,
          sortby: item.sortby === 'name' ? 'name' : 'seq',
          type: 'menu',
        });
      }
    });
    // Filter out empty array values
    return ret ? ret.filter((x) => x) : undefined;
  }, [dataFlat, formValues]);

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
      const field = id + '-' + fieldName;
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
      data: data?.tree,
      pageSchema,
      formValues,
      isProcessing,
      isLoading,
      error,
      isSaved,
      getFieldValue,
      getStandardTextInputAttributes,
      setAllValues,
      setFieldValue,
      handleChange,
      handleSave,
    }),
    [
      data,
      formValues,
      isProcessing,
      isLoading,
      error,
      isSaved,
      getFieldValue,
      getStandardTextInputAttributes,
      setAllValues,
      setFieldValue,
      handleChange,
      handleSave,
    ],
  );
};

export default usePagesEdit;
