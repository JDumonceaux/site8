import { useCallback, useEffect, useState } from 'react';

import { ServiceUrl } from 'lib/utils/constants';
import type { Test } from 'types/Test';
import type { Tests } from 'types/Tests';
import { z } from 'zod';

import useTests from './useTests';
import { useAxios } from '../../hooks/Axios/useAxios';
import useFormArray from '../../hooks/useFormArray';

// Define Zod Shape
const pageSchema = z.object({
  action: z.string().optional(),
  id: z.number(),
  level: z.string().optional(),
  lineId: z.number(),
  name: z.string().optional(),
  parentId: z.string().optional(),
  parentSeq: z.string().optional(),
  projectType: z.string().optional(),
  text: z.string().optional(),
  type: z.string().optional(),
});

// Create a type from the schema
type FormType = z.infer<typeof pageSchema>;
type FormKeys = keyof FormType;

const useTestsEdit = () => {
  const { patchData } = useAxios<Tests>();
  const [localItems, setLocalItems] = useState<null | Test[]>();

  const { data, isError, isPending } = useTests();

  // Create a form
  const {
    formValues,
    getFieldValue,
    isSaved,
    setFieldValue,
    setFormValues,
    setIsSaved,
  } = useFormArray<FormType>();

  // Save to local - adding local index
  useEffect(() => {
    setLocalItems(data?.items?.map((x, index) => ({ ...x, lineId: index })));
  }, [data?.items, setLocalItems]);

  const getDefaultProps = (lineId: number, fieldName: FormKeys) => ({
    'data-id': fieldName,
    'data-line': lineId,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(lineId, fieldName, e.target.value);
    },
    value: getFieldValue(lineId, fieldName),
  });

  // Get the updates
  const getUpdates = useCallback((): null | Tests => {
    if (!data?.items) {
      return null;
    }

    const returnValue: Test[] = [];
    for (const item of formValues) {
      // Match on TempId = Id
      const originalItem = data.items.find((x) => x.id === item.id);
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
      items: returnValue.filter(Boolean),
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
    //setIsProcessing(true);
    const result = await patchData(ServiceUrl.ENDPOINT_TESTS, data);
    //setIsProcessing(false);
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
    const returnValue = await submitForm();
    return returnValue;
  }, [submitForm]);

  return {
    data: localItems,
    getDefaultProps,
    getFieldValue,
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

export default useTestsEdit;
