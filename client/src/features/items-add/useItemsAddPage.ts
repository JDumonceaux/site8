import { useEffect, useState } from 'react';

import type { ItemAdd, ItemAddExt } from '@/features/items-add/ItemAdd';
import useSnackbar from '@/features/app/snackbar/useSnackbar';
import { useAxios } from '@hooks/axios/useAxios';
import useFormArray from '@hooks/useFormArray';
import { ServiceUrl } from '@lib/utils/constants';
import {
  getDefaultObject,
  removeEmptyAttributesArray,
} from '@lib/utils/objectUtil';

const ITEM_COUNT = 10;

const useItemsAddPage = () => {
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

  const { error, isError, isPending, putData } = useAxios<unknown>();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setArtistId(event.target.value);
  };

  const defaultObject = getDefaultObject<ItemAddExt>();

  const mapDataToForm = () => {
    return Array.from({ length: ITEM_COUNT }, (_, index) => ({
      ...defaultObject,
      lineId: index + 1,
    }));
  };

  useEffect(() => {
    setFormValues(mapDataToForm());
  }, [setFormValues]);

  const saveItems = async (updates: ItemAdd[]) => {
    const cleanedData = removeEmptyAttributesArray(updates);
    return putData(ServiceUrl.ENDPOINT_ITEMS, cleanedData);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { dataset, value } = event.target;
    const { id, line } = dataset;
    const lineNumber = Number(line);
    if (id) {
      setFieldValue(lineNumber, id as keyof ItemAddExt, value);
    } else {
      throw new Error('No id found');
    }
  };

  const handleClear = () => {
    setFormValues(mapDataToForm());
  };

  const getUpdates = (): ItemAdd[] | null => {
    const returnValue: ItemAdd[] = [];
    const artistIdNumber = Number(artistId);

    for (const index of getIndex()) {
      const item = getItem(index.lineId);
      if (item) {
        const { lineId, ...rest } = item;
        const newItem: ItemAdd = { ...rest, artistId: artistIdNumber };
        const isEmpty = Object.values(newItem).every((x) => x === '');
        if (!isEmpty) {
          returnValue.push(newItem);
        }
      }
    }

    const filtered = returnValue.filter((x) => x.title?.trim() !== '');
    return filtered.length > 0 ? filtered : null;
  };

  const handleSubmit = () => {
    const updates = getUpdates();

    if (!updates) {
      setErrorMessage('No changes to save');
      return;
    }
    setMessage('Saving...');

    saveItems(updates)
      .then((result) => {
        if (result) {
          setMessage('Saved');
        } else {
          setMessage(`Error saving ${error}`);
        }
      })
      .catch((error_: unknown) => {
        if (error_ instanceof Error) {
          setMessage(`An unexpected error occurred: ${error_.message}`);
        } else {
          setMessage('An unexpected error occurred');
        }
      });
  };

  return {
    artistId,
    data: formValues,
    getFieldValue,
    handleChange,
    handleClear,
    handleFilterChange,
    handleSubmit,
    isError,
    isPending,
    setFieldValue,
  };
};

export default useItemsAddPage;
