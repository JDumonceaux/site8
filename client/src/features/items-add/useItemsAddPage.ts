import { useEffect, useEffectEvent, useState } from 'react';

import useSnackbar from '@features/app/snackbar-temp/useSnackbar';
import { useAxios } from '@hooks/axios-temp/useAxios';
import useFormArray from '@hooks/useFormArray';
import { ServiceUrl } from '@lib/utils/constants';
import { removeEmptyAttributesArray } from '@lib/utils/objectUtil';
import type { ItemAdd, ItemAddExt } from './ItemAdd';

const ITEM_COUNT = 10;

type UseItemsAddPageReturn = {
  readonly artistId: string;
  readonly data: ItemAddExt[];
  readonly getFieldValue: (
    lineId: number,
    fieldName: keyof ItemAddExt,
  ) => string;
  readonly handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  readonly handleClear: () => void;
  readonly handleFilterChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  readonly handleSubmit: () => void;
  readonly isLoading: boolean;
  readonly setFieldValue: (
    lineId: number,
    fieldName: keyof ItemAddExt,
    value: boolean | null | number | string,
  ) => void;
};

/**
 * Custom hook for managing the items add page state and operations
 * @returns State and handlers for the items add page
 */
const useItemsAddPage = (): UseItemsAddPageReturn => {
  const { setErrorMessage, setMessage } = useSnackbar();
  const [artistId, setArtistId] = useState('');

  const {
    formValues,
    getFieldValue,
    getIndex,
    getItem,
    setFieldValue,
    setFormValues,
  } = useFormArray<ItemAddExt>();

  const { error, isLoading, putData } = useAxios<unknown>();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setArtistId(event.target.value);
  };

  const createDefaultItem = (lineId: number): ItemAddExt => ({
    artisticPeriod: '',
    description: '',
    lineId,
    location: '',
    officialWebAddress: '',
    tags: '',
    title: '',
    year: '',
  });

  const setInitialItemsEvent = useEffectEvent(() => {
    const items = Array.from({ length: ITEM_COUNT }, (_, index) =>
      createDefaultItem(index + 1),
    );
    setFormValues(items);
  });
  useEffect(() => {
    setInitialItemsEvent();
  }, []);

  const handleClear = () => {
    const items = Array.from({ length: ITEM_COUNT }, (_, index) =>
      createDefaultItem(index + 1),
    );
    setFormValues(items);
  };

  const saveItems = async (updates: ItemAdd[]) => {
    const cleanedData = removeEmptyAttributesArray(updates);
    return putData(ServiceUrl.ENDPOINT_ITEMS, cleanedData);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { dataset, value } = event.target;
    const { id, line } = dataset;

    if (!id || !line) {
      console.error('Missing data attributes: id or line');
      return;
    }

    const lineNumber = Number(line);
    if (Number.isNaN(lineNumber)) {
      console.error('Invalid line number:', line);
      return;
    }

    setFieldValue(lineNumber, id as keyof ItemAddExt, value);
  };

  const getUpdates = (): ItemAdd[] | null => {
    const artistIdNumber = Number(artistId);

    if (!artistIdNumber || Number.isNaN(artistIdNumber)) {
      console.error('Invalid artist ID:', artistId);
      return null;
    }

    const items: ItemAdd[] = [];

    for (const index of getIndex()) {
      const item = getItem(index.lineId);
      if (!item) {
        continue;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { lineId, ...rest } = item;
      const newItem: ItemAdd = { ...rest, artistId: artistIdNumber };

      // Check if all values are empty
      const isEmpty = Object.values(newItem).every(
        (value) => value === '' || value === 0,
      );

      if (!isEmpty) {
        items.push(newItem);
      }
    }

    // Filter out items without a title
    const filtered = items.filter((item) => item.title.trim() !== '');
    return filtered.length > 0 ? filtered : null;
  };

  const handleSubmit = (): void => {
    const updates = getUpdates();

    if (!updates) {
      setErrorMessage('No changes to save');
      return;
    }

    setMessage('Saving...');

    void (async () => {
      try {
        const result = await saveItems(updates);
        if (result) {
          setMessage('Items saved successfully');
        } else {
          setMessage(error ? `Error saving: ${error}` : 'Error saving items');
        }
      } catch (error_: unknown) {
        const errorMessage =
          error_ instanceof Error
            ? `An unexpected error occurred: ${error_.message}`
            : 'An unexpected error occurred';
        setMessage(errorMessage);
        console.error('Error saving items:', error_);
      }
    })();
  };

  return {
    artistId,
    data: formValues,
    getFieldValue,
    handleChange,
    handleClear,
    handleFilterChange,
    handleSubmit,
    isLoading,
    setFieldValue,
  };
};

export default useItemsAddPage;
