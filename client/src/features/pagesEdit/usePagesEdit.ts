import { useEffect, useState } from 'react';

import { useAxios } from '@hooks/Axios/useAxios';
import useFormArray from '@hooks/useFormArray';
import { REQUIRED_FIELD, ServiceUrl } from '@lib/utils/constants';
import type { MenuEdit, MenuItem } from '../../types';
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

const usePagesEdit = () => {
  const [localItems, setLocalItems] = useState<MenuItem[] | undefined>();
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

  // Save to local - adding local index
  useEffect(() => {
    setLocalItems(
      data?.items?.map((x, index) => ({ ...x, lineId: index + 1 })),
    );
  }, [data?.items, setLocalItems]);

  function mapFormTypeToMenuEdit(item: FormType): MenuEdit | undefined {
    return {
      id: item.id,
      newParent: {
        id: item.parentId,
        seq: Number.isNaN(item.parentSeq) ? 0 : Number(item.parentSeq),
        sortby: item.parentSortby as SortByType,
      },
      // Temporary filler
      priorParent: { id: 0, seq: 0, sortby: 'name' as SortByType },
    };
  }

  function shouldUpdate(
    originalItem: MenuItem | undefined,
    newItem: MenuEdit | undefined,
  ): boolean {
    if (!originalItem || !newItem) {
      return false;
    }
    const { parentItem } = originalItem;
    const { newParent } = newItem;

    const { id, seq, sortby } = newParent;
    if (id && Number.isInteger(id) && id > -1 && parentItem.id !== id) {
      return true;
    }
    if (seq && Number.isInteger(seq) && seq > -1 && parentItem.seq !== seq) {
      return true;
    }
    if (sortby && sortby.length > 0 && parentItem.sortby !== sortby) {
      return true;
    }
    return false;
  }

  // We only want to submit the differences - not every record.
  function getUpdates(): MenuEdit[] | undefined {
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
  }

  async function submitForm() {
    const updates = getUpdates();
    if (!updates) {
      return false;
    }
    // setIsProcessing(true);
    const result = await patchData(ServiceUrl.ENDPOINT_MENUS, updates);
    // setIsProcessing(false);
    setIsSaved(result);
    return result;
  }

  function handleChange(id: number, fieldName: FormKeys, value: string) {
    setFieldValue(id, fieldName, value);
  }

  async function handleSave() {
    const returnValue = await submitForm();
    return returnValue;
  }

  function getDefaultProps(lineId: number, fieldName: FormKeys) {
    return {
      'data-id': fieldName,
      'data-line': lineId,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(lineId, fieldName, e.target.value);
      },
      value: getFieldValue(lineId, fieldName),
    };
  }

  return {
    data: localItems,
    error,
    getDefaultProps,
    getFieldValue,
    handleChange,
    handleSave,
    isError,
    isLoading,
    isSaved,
    pageSchema,
    setFieldValue,
    setFormValues,
  };
};

export default usePagesEdit;
