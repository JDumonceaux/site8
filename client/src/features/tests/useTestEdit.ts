import { useActionState } from 'react';

import { REQUIRED_FIELD, ServiceUrl } from '@lib/utils/constants';
import type { MenuEdit } from '@types';
import { z } from 'zod';
import { useAxios } from '../../hooks/axios/useAxios';
import useFormArray from '../../hooks/useFormArray';
import useTestMenus from './useTestMenus';

export type SortByType = 'name' | 'seq';

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

type FormState = {
  message?: string;
  success?: boolean;
};

const useTestEdit = () => {
  const { data, isError } = useTestMenus();

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
  const getUpdates = (): MenuEdit[] | null => {
    if (!data?.items) {
      return null;
    }

    const returnValue: MenuEdit[] = [];
    for (const item of formValues) {
      const originalItem = data.items.find((x) => x.lineId === item.lineId);
      if (originalItem) {
        const x: MenuEdit = {
          ...originalItem,
          newParent: true,
          parentId: Number.parseInt(item.parent, 10),
          parentSeq: Number.parseInt(item.seq, 10),
          parentSortby: item.sortby as SortByType,
        };
        returnValue.push(x);
      }
    }

    // Filter out empty array values
    return returnValue.filter(Boolean);
  };

  // Handle save
  const submitForm = async () => {
    const updates = getUpdates();
    if (!updates) {
      return false;
    }
    const result = await patchData(ServiceUrl.ENDPOINT_MENUS, updates);
    setIsSaved(!!result);
    return result;
  };

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

      const result = await patchData(ServiceUrl.ENDPOINT_MENUS, updates);

      if (!result) {
        setIsSaved(false);
        return {
          message: 'Failed to save test edits',
          success: false,
        };
      }

      setIsSaved(true);
      return {
        message: 'Test edits saved successfully',
        success: true,
      };
    } catch (error_: unknown) {
      setIsSaved(false);
      const errorMessage =
        error_ instanceof Error
          ? `Error saving test edits: ${error_.message}`
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

  const handleChange = (id: number, fieldName: FormKeys, value: string) => {
    setFieldValue(id, fieldName, value);
  };

  const handleSave = async () => submitForm();

  const getStandardInputTextAttributes = (
    lineId: number,
    fieldName: FormKeys,
  ) => {
    const field = `${fieldName}-${lineId}`;
    return {
      id: field,
      value: getFieldValue(lineId, fieldName),
    };
  };

  const filteredData = data?.items;

  return {
    actionState,
    data: filteredData,
    formAction,
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
