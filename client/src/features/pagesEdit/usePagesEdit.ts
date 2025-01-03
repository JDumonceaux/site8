import { useAxios } from 'hooks/Axios/useAxios';
import useFormArray from 'hooks/useFormArray';
import { REQUIRED_FIELD, ServiceUrl } from 'lib/utils/constants';
import { useCallback, useEffect, useState } from 'react';
import { Menu, MenuEdit, MenuItem } from 'types';
import { z } from 'zod';

// Define Zod Shape
const pageSchema = z.object({
  id: z.number(),
  lineId: z.number(),
  name: z.string().optional(),
  parentId: z.string().min(1, { message: REQUIRED_FIELD }),
  parentSeq: z.string(),
  parentSortby: z.string(),
  type: z.string(),
});

// Create a type from the schema
type FormType = z.infer<typeof pageSchema>;
type FormKeys = keyof FormType;
type SortByType = 'name' | 'seq';

const usePagesEdit = () => {
  const { data, error, fetchData, isLoading } = useAxios<Menu>();
  const [localItems, setLocalItems] = useState<MenuItem[] | undefined>();
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

  // Get the data
  useEffect(() => {
    fetchData(ServiceUrl.ENDPOINT_MENUS_EDIT);
  }, [fetchData]);

  // Save to local - adding local index
  useEffect(() => {
    setLocalItems(
      data?.items?.map((x, index) => ({ ...x, lineId: index + 1 })),
    );
  }, [data?.items, setLocalItems]);

  /**
   * Maps a FormType item to a MenuEdit object.
   *
   * @param item - The FormType item to be mapped.
   * @returns The mapped MenuEdit object.
   */
  const mapFormTypeToMenuEdit = useCallback(
    (item: FormType): MenuEdit | undefined => {
      if (!item) {
        return undefined;
      }
      return {
        id: item.id,
        newParent: {
          id: Number.isNaN(item.parentId) ? 0 : Number(item.parentId),
          seq: Number.isNaN(item.parentSeq) ? 0 : Number(item.parentSeq),
          sortby: item.parentSortby as SortByType,
        },
        // Temporary filler
        priorParent: { id: 0, seq: 0, sortby: 'name' as SortByType },
      };
    },
    [],
  );

  /**
   * Determines whether the original item should be updated based on the new item.
   * Returns true if the original item should be updated, false otherwise.
   *
   * @param originalItem - The original item to compare.
   * @param newItem - The new item to compare.
   * @returns A boolean indicating whether the original item should be updated.
   */
  const shouldUpdate = (
    originalItem: MenuItem | undefined,
    newItem: MenuEdit | undefined,
  ): boolean => {
    if (!originalItem || !newItem) {
      return false;
    }
    const { parentItem } = originalItem;
    const { newParent } = newItem;
    if (!parentItem && !newParent) {
      return false;
    }
    if (!newParent) {
      return false;
    }
    const { id, seq, sortby } = newParent;
    if (
      id &&
      Number.isInteger(id) &&
      id > -1 &&
      (!parentItem || parentItem.id !== id)
    ) {
      return true;
    }
    if (
      seq &&
      Number.isInteger(seq) &&
      seq > -1 &&
      (!parentItem || parentItem.seq !== seq)
    ) {
      return true;
    }
    if (
      sortby &&
      sortby.length > 0 &&
      parentItem &&
      parentItem.sortby !== sortby
    ) {
      return true;
    }
    return false;
  };

  /**
   * Retrieves the updates to be made based on the form values and local items.
   * @returns An array of MenuEdit objects representing the updates, or undefined if there are no local items.
   */
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
          ? { ...temporaryItem, priorParent: { ...currentItem?.parentItem } }
          : temporaryItem;
      if (shouldUpdate(currentItem, newItem) && newItem) {
        returnValue.push(newItem);
      }
    }

    // Filter out empty array values
    return returnValue ? returnValue.filter(Boolean) : undefined;
  };

  /**
   * Submits the form data to update menus.
   * @returns A promise that resolves to a boolean indicating whether the form submission was successful.
   */
  const submitForm = async () => {
    const data = getUpdates();
    if (!data) {
      return false;
    }
    // setIsProcessing(true);
    const result = await patchData(`${ServiceUrl.ENDPOINT_MENUS}`, data);
    // setIsProcessing(false);
    setIsSaved(result);
    return result;
  };

  /**
   * Handles the change event for a specific field in a page.
   * @param id - The ID of the page.
   * @param fieldName - The name of the field being changed.
   * @param value - The new value for the field.
   */
  const handleChange = (id: number, fieldName: FormKeys, value: string) => {
    setFieldValue(id, fieldName, value);
  };

  /**
   * Handles the save operation by submitting the form and returning the result.
   * @returns {Promise<any>} A promise that resolves to the result of the save operation.
   */
  const handleSave = async () => {
    const returnValue = await submitForm();
    return returnValue;
  };

  const getDefaultProps = (lineId: number, fieldName: FormKeys) => ({
    'data-id': fieldName,
    'data-line': lineId,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setFieldValue(lineId, fieldName, e.target.value),
    value: getFieldValue(lineId, fieldName),
  });

  return {
    data: localItems,
    error,
    getFieldValue,
    getDefaultProps,
    handleChange,
    handleSave,
    isLoading,
    isSaved,
    pageSchema,
    setFieldValue,
    setFormValues,
  };
};

export default usePagesEdit;
