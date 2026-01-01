import { useActionState, useOptimistic } from 'react';

import { ServiceUrl } from '@lib/utils/constants';
import type { Test } from '@types';
import type { Tests } from '@types';
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

type FormState = {
  message?: string;
  success?: boolean;
};

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

  // Optimistic update for saved state
  const [optimisticSaved, setOptimisticSaved] = useOptimistic(
    isSaved,
    (_state, newValue: boolean) => newValue,
  );

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

  // Action function for useActionState
  const submitAction = async (
    _prevState: FormState,
    _formData: FormData,
  ): Promise<FormState> => {
    try {
      const updates = getUpdates();
      if (!updates) {
        return {
          message: 'No updates to save',
          success: false,
        };
      }

      // Optimistically mark as saved
      setOptimisticSaved(true);
      const result = await patchData(ServiceUrl.ENDPOINT_TESTS, updates);

      if (!result) {
        // Revert optimistic state on error
        setIsSaved(false);
        return {
          message: 'Failed to save tests',
          success: false,
        };
      }

      setIsSaved(true);
      return {
        message: 'Tests saved successfully',
        success: true,
      };
    } catch (error_: unknown) {
      // Revert optimistic state on error
      setIsSaved(false);
      const errorMessage =
        error_ instanceof Error
          ? `Error saving tests: ${error_.message}`
          : 'An unexpected error occurred';
      return {
        message: errorMessage,
        success: false,
      };
    }
  };

  const [actionState, formAction, isPending] = useActionState<
    FormState,
    FormData
  >(submitAction, {});

  // Handle save (kept for backward compatibility)
  const handleSave = async () => {
    // Create a FormData object and invoke formAction
    const formData = new FormData();
    formAction(formData);
    return actionState.success ?? false;
  };

  const handleChange = (id: number, fieldName: FormKeys, value: string) => {
    setFieldValue(id, fieldName, value);
  };

  return {
    actionState,
    data: localItems,
    formAction,
    getDefaultProps,
    getFieldValue,
    handleChange,
    handleSave,
    isError,
    isPending,
    isSaved: optimisticSaved,
    pageSchema,
    setFieldValue,
    setFormValues,
  };
};

export default useTestsEdit;
