import { ServiceUrl } from 'lib/utils/constants';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Test } from 'types/Test';
import { Tests } from 'types/Tests';
import { z } from 'zod';

import { useAxios } from '../../hooks/Axios/useAxios';
import { useFormArray } from '../../hooks/useFormArray';

// Define Zod Shape
const pageSchema = z.object({
  action: z.string().optional(),
  id: z.number(),
  level: z.string().optional(),
  localId: z.number(),
  name: z.string().optional(),
  parentId: z.string().optional(),
  parentSeq: z.string().optional(),
  projectType: z.string().optional(),
  text: z.string().optional(),
  type: z.string().optional(),
});

// Create a type from the schema
type FormType = z.infer<typeof pageSchema>;
type keys = keyof FormType;

const useTestsEdit = () => {
  const { data, error, fetchData, isLoading, patchData } = useAxios<Tests>();
  const [localItems, setLocalItems] = useState<Test[] | undefined>();

  // Create a form
  const {
    formValues,
    getDefaultProps,
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

    const returnValue: Test[] = [];
    for (const item of formValues) {
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
    }

    // Filter out empty array values
    return {
      ...data,
      items: returnValue ? returnValue.filter(Boolean) : undefined,
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
    const returnValue = await submitForm();
    return returnValue;
  }, [submitForm]);

  return useMemo(
    () => ({
      data: localItems,
      error,
      getDefaultProps,
      getFieldValue,
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
