import { useCallback, useEffect, useMemo, useState } from 'react';
import { Test } from 'types/Test';
import { Tests } from 'types/Tests';
import { ServiceUrl } from 'utils/constants';
import { z } from 'zod';
import { useAxios } from './Axios/useAxios';
import { useFormArray } from './useFormArray';

// Define Zod Shape
const pageSchema = z.object({
  localId: z.number(),
  id: z.number(),
  name: z.string().optional(),
  text: z.string().optional(),
  type: z.string().optional(),
  level: z.string().optional(),
  projectType: z.string().optional(),
  parentId: z.string().optional(),
  parentSeq: z.string().optional(),
  action: z.string().optional(),
});

// Create a type from the schema
type FormType = z.infer<typeof pageSchema>;
type keys = keyof FormType;

const useTestsEdit = () => {
  const { data, fetchData, isLoading, error } = useAxios<Tests>();
  const [localItems, setLocalItems] = useState<Test[] | undefined>();
  const { patchData } = useAxios<Tests>();

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
    fetchData(ServiceUrl.ENDPOINT_TESTS);
  }, [fetchData]);

  // Save to local - adding local index
  useEffect(() => {
    setLocalItems(data?.items?.map((x, index) => ({ ...x, localId: index })));
  }, [data?.items, setLocalItems]);

  // Get the updates
  const getUpdates = useCallback((): Tests | undefined => {
    if (!data?.items) {
      return undefined;
    }

    const ret: Test[] = [];
    formValues.forEach((item) => {
      // Match on TempId = Id
      const originalItem = data.items?.find((x) => x.id === item.id);
      if (originalItem) {
        // const x: Test = {
        //   ...originalItem,
        //   newParentId: parseInt(item.parent),
        //   newSeq: parseInt(item.seq),
        //   newSortby: item.sortby as sortByType,
        // };
        // temp.push(x);
      }
    });

    // Filter out empty array values
    return {
      ...data,
      items: ret ? ret.filter((x) => x) : undefined,
    };
  }, [data, formValues]);

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
    const result = await patchData(`${ServiceUrl.ENDPOINT_TESTS}`, data);
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

  return useMemo(
    () => ({
      data: localItems,
      pageSchema,
      isProcessing,
      isLoading,
      error,
      isSaved,
      getDefaultProps,
      getFieldValue,
      setFieldValue,
      handleChange,
      handleSave,
      setFormValues,
    }),
    [
      localItems,
      isProcessing,
      isLoading,
      error,
      isSaved,
      getDefaultProps,
      getFieldValue,
      setFieldValue,
      handleChange,
      handleSave,
      setFormValues,
    ],
  );
};

export default useTestsEdit;
