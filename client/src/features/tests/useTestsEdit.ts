import { ServiceUrl } from '@lib/utils/constants';
import type { Test } from '@types/Test';
import type { Tests } from '@types/Tests';
import { z } from 'zod';
import { useAxios } from '../../hooks/axios/useAxios';
import useFormArray from '../../hooks/useFormArray';
import useTests from './useTests';

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

  const { data, isError } = useTests();

  // Compute local items with lineId during render instead of storing in state
  const localItems = data?.items?.map((x, index) => ({ ...x, lineId: index }));

  // Create a form
  const {
    formValues,
    getFieldValue,
    isSaved,
    setFieldValue,
    setFormValues,
    setIsSaved,
  } = useFormArray<FormType>();

  const getDefaultProps = (lineId: number, fieldName: FormKeys) => ({
    'data-id': fieldName,
    'data-line': lineId,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(lineId, fieldName, e.target.value);
    },
    value: getFieldValue(lineId, fieldName),
  });

  // Get the updates
  const getUpdates = (): null | Tests => {
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
  };

  // Validate form
  // const validateForm = () => {
  //   const result = safeParse<FormType>(pageSchema, formValues);
  //   setErrors(result.error?.issues);
  //   return result.success;
  // };

  // Handle save
  const submitForm = async () => {
    const updates = getUpdates();
    if (!updates) {
      return false;
    }
    //setIsProcessing(true);
    const result = await patchData(ServiceUrl.ENDPOINT_TESTS, updates);
    //setIsProcessing(false);
    setIsSaved(result);
    return result;
  };

  const handleChange = (id: number, fieldName: FormKeys, value: string) => {
    setFieldValue(id, fieldName, value);
  };

  const handleSave = async () => {
    const returnValue = await submitForm();
    return returnValue;
  };

  return {
    data: localItems,
    getDefaultProps,
    getFieldValue,
    handleChange,
    handleSave,
    isError,
    isSaved,
    pageSchema,
    setFieldValue,
    setFormValues,
  };
};

export default useTestsEdit;
