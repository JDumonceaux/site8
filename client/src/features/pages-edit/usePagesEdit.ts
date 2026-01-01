import { useActionState, useOptimistic } from 'react';

import { useAxios } from '@hooks/axios/useAxios';
import useFormArray from '@hooks/useFormArray';
import { REQUIRED_FIELD, ServiceUrl } from '@lib/utils/constants';
import type { MenuEdit, MenuItem } from '@types';
import { z } from 'zod';
import useMenusEdit from './useMenusEdit';

// Define Zod Shape
const pageSchema = z.object({
  id: z.number(),
  lineId: z.number(),
  name: z.string().optional(),
  parentId: z.number().min(1, { message: REQUIRED_FIELD }),
  parentSeq: z.string(),
  parentSortby: z.string(),
  type: z.string(),
});

// Create a type from the schema
type FormType = z.infer<typeof pageSchema>;
type FormKeys = keyof FormType;
type SortByType = 'name' | 'seq';

type FormState = {
  message?: string;
  success?: boolean;
};

const usePagesEdit = () => {
  // Derived localItems from data
  const { patchData } = useAxios<MenuEdit[]>();

  const { data, error, isError, isLoading } = useMenusEdit();

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

  const localItems = data?.items?.map((x, index) => ({
    ...x,
    lineId: index + 1,
  }));

  const mapFormTypeToMenuEdit = (item: FormType): MenuEdit | undefined => ({
    id: item.id,
    lineId: item.lineId,
    newParent: true,
    parentId: item.parentId,
    parentSeq: Number.isNaN(item.parentSeq) ? 0 : Number(item.parentSeq),
    parentSortby: item.parentSortby as SortByType,
  });

  const shouldUpdate = (
    originalItem: MenuItem | undefined,
    newItem: MenuEdit | undefined,
  ): boolean => {
    if (!originalItem || !newItem) {
      return false;
    }
    const { parentItem } = originalItem;
    const { parentId, parentSeq, parentSortby } = newItem;

    if (
      parentId &&
      Number.isInteger(parentId) &&
      parentId > -1 &&
      parentItem?.id !== parentId
    ) {
      return true;
    }
    if (
      parentSeq &&
      Number.isInteger(parentSeq) &&
      parentSeq > -1 &&
      parentItem?.seq !== parentSeq
    ) {
      return true;
    }
    if (
      parentSortby &&
      parentSortby.length > 0 &&
      parentItem?.sortby !== parentSortby
    ) {
      return true;
    }
    return false;
  };

  // We only want to submit the differences - not every record.
  const getUpdates = (): MenuEdit[] | undefined => {
    if (!localItems) {
      return undefined;
    }

    const returnValue: MenuEdit[] = [];
    for (const item of formValues) {
      // Map item
      const temporaryItem = mapFormTypeToMenuEdit(item);
      // Find the original item
      const currentItem = localItems.find((x) => x.lineId === item.lineId);
      const newItem =
        temporaryItem && currentItem?.parentItem
          ? { ...temporaryItem, priorParent: { ...currentItem.parentItem } }
          : temporaryItem;
      if (shouldUpdate(currentItem, newItem) && newItem) {
        returnValue.push(newItem);
      }
    }

    // Filter out empty array values
    return returnValue.filter(Boolean);
  };

  const submitForm = async () => {
    const updates = getUpdates();
    if (!updates) {
      return false;
    }
    // Optimistically mark as saved
    setOptimisticSaved(true);
    const result = await patchData(ServiceUrl.ENDPOINT_MENUS, updates);
    if (!result) {
      // Revert optimistic state on error
      setIsSaved(false);
    } else {
      setIsSaved(true);
    }
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

      // Optimistically mark as saved
      setOptimisticSaved(true);
      const result = await patchData(ServiceUrl.ENDPOINT_MENUS, updates);

      if (!result) {
        // Revert optimistic state on error
        setIsSaved(false);
        return {
          message: 'Failed to save pages',
          success: false,
        };
      }

      setIsSaved(true);
      return {
        message: 'Pages saved successfully',
        success: true,
      };
    } catch (error_: unknown) {
      // Revert optimistic state on error
      setIsSaved(false);
      const errorMessage =
        error_ instanceof Error
          ? `Error saving pages: ${error_.message}`
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

  const handleSave = async () => {
    const returnValue = await submitForm();
    return returnValue;
  };

  const getDefaultProps = (lineId: number, fieldName: FormKeys) => ({
    'data-id': fieldName,
    'data-line': lineId,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(lineId, fieldName, e.target.value);
    },
    value: getFieldValue(lineId, fieldName),
  });

  return {
    actionState,
    data: localItems,
    error,
    formAction,
    getDefaultProps,
    getFieldValue,
    handleChange,
    handleSave,
    isError,
    isLoading,
    isPending,
    isSaved: optimisticSaved,
    pageSchema,
    setFieldValue,
    setFormValues,
  };
};

export default usePagesEdit;
