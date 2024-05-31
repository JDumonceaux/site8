import { useCallback, useEffect, useMemo } from 'react';
import { REQUIRED_FIELD } from 'utils';
import { z } from 'zod';
import { useFormArray } from './useFormArray';
import useMenu from './useMenu';
import { MenuEntry } from 'services/types/MenuEntry';

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
  const { data, fetchData, isLoading, error } = useMenu();

  // Get the data
  useEffect(() => {
    fetchData();
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
    (items: MenuEntry[] | undefined): FormValues[] | undefined => {
      if (!items) {
        return undefined;
      }

      const ret = items.map((x) => {
        return {
          id: x.id,
          parent: x.parentId.toString(),
          seq: x.seq,
          sortby: x.sortby,
        };
      });
      return ret;
    },
    [],
  );

  const getDataFlat = useCallback(
    (items: MenuEntry[] | undefined | null): MenuEntry[] | undefined => {
      if (!items) {
        return undefined;
      }

      const ret: MenuEntry[] = [];
      items.forEach((item) => {
        ret.push(item);
        if (item.items) {
          const x = getDataFlat(item.items);
          if (x) {
            ret.push(...x);
          }
        }
      });
      return ret;
    },
    [],
  );

  // Update the form values when the data changes
  useEffect(() => {
    const values = data?.items
      ? mapPageToFormValues(getDataFlat(data.items))
      : undefined;
    if (values) {
      setAllValues(values);
    }
  }, [data, getDataFlat, mapPageToFormValues, setAllValues]);

  // Validate form
  // const validateForm = useCallback(() => {
  //   const result = safeParse<FormValues>(pageSchema, formValues);
  //   setErrors(result.error?.issues);
  //   return result.success;
  // }, [formValues, setErrors]);

  // Handle save
  const submitForm = useCallback(async () => {
    setIsProcessing(true);
    // const { id, ...rest } = formValues;
    // const data = {
    //   ...rest,
    //   id,
    //   //  parent: splitParent(parent),
    // };
    // // const result =
    // //   data.id > 0
    // //     ? await patchData(`${ServiceUrl.ENDPOINT_PAGE}`, data)
    // //     : await postData(`${ServiceUrl.ENDPOINT_PAGE}`, data);
    // setIsProcessing(false);
    // setIsSaved(result);
    // return result;
  }, [setIsProcessing]);

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
      data,
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
