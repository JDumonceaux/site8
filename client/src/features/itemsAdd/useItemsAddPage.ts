import { useCallback, useEffect, useMemo, useState } from 'react';

import useSnackbar from 'features/app/useSnackbar';
import type { ItemAdd, ItemAddExt } from 'features/itemsAdd/ItemAdd';
import { useAxios } from 'hooks/Axios/useAxios';
import useFormArray from 'hooks/useFormArray';
import { ServiceUrl } from 'lib/utils/constants';
import {
  getDefaultObject,
  removeEmptyAttributesArray,
} from 'lib/utils/objectUtil';

const ITEM_COUNT = 10;

const useItemsAddPage = () => {
  const { setErrorMessage, setMessage } = useSnackbar();
  const [artistId, setArtistId] = useState('');

  // Create a form
  const {
    formValues,
    getFieldValue,
    getIndex,
    getItem,
    setFieldValue,
    setFormValues,
  } = useFormArray<ItemAddExt>();

  const { error, putData } = useAxios<unknown>();

  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setArtistId(event.target.value);
    },
    [],
  );

  const defaultObject = useMemo(() => getDefaultObject<ItemAddExt>(), []);

  // Map database to form
  const mapDataToForm = useCallback(() => {
    const ret: ItemAddExt[] = Array.from(
      { length: ITEM_COUNT },
      (_, index) => ({ ...defaultObject, lineId: index + 1 }),
    );
    return ret;
  }, [defaultObject]);

  useEffect(() => {
    setFormValues(mapDataToForm());
  }, [mapDataToForm, setFormValues]);

  // Handle save
  const saveItems = useCallback(
    async (updates: ItemAdd[]) => {
      const cleanedData = removeEmptyAttributesArray(updates);
      return putData(ServiceUrl.ENDPOINT_ITEMS, cleanedData);
    },
    [putData],
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { dataset, value } = event.target;
    const { id, line } = dataset;
    const lineNum = Number(line);
    if (id) {
      setFieldValue(lineNum, id as keyof ItemAddExt, value);
    } else {
      throw new Error('No id found');
    }
  };

  const handleClear = () => {
    setFormValues(mapDataToForm());
  };

  // Only submit updated records
  const getUpdates = useCallback(() => {
    const ret: ItemAdd[] = [];
    const artistIdNum = Number(artistId);
    for (const i of getIndex()) {
      const item: ItemAddExt | null = getItem(i.lineId);
      if (item) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { lineId, ...rest } = item;
        const newItem: ItemAdd = { ...rest, artistId: artistIdNum };
        // Check for empty objects
        const isEmpty = Object.values(newItem).every((x) => x === '');
        if (!isEmpty) {
          ret.push(newItem);
        }
      }
    }
    // Remove empty titles
    const filtered = ret.filter((x) => x.title && x.title.trim() !== '');
    return filtered.length > 0 ? filtered : null;
  }, [artistId, getIndex, getItem]);

  const handleSubmit = useCallback(() => {
    const updates = getUpdates();

    if (!updates) {
      setErrorMessage('No changes to save');
      return;
    }
    setMessage('Saving...');

    // eslint-disable-next-line promise/catch-or-return
    saveItems(updates)
      // eslint-disable-next-line promise/prefer-await-to-then
      .then((result) => {
        // eslint-disable-next-line promise/always-return
        if (result) {
          setMessage('Saved');
          //handleRefresh();
        } else {
          setMessage(`Error saving ${error}`);
        }
      })
      // eslint-disable-next-line promise/prefer-await-to-then
      .catch((error_: unknown) => {
        if (error_ instanceof Error) {
          setMessage(`An unexpected error occurred: ${error_.message}`);
        } else {
          setMessage('An unexpected error occurred');
        }
      })
      // eslint-disable-next-line promise/prefer-await-to-then
      .finally(() => {
        //   setIsProcessing(false);
      });
  }, [getUpdates, setMessage, saveItems, setErrorMessage, error]);

  return {
    artistId,
    data: formValues,
    getFieldValue,
    handleChange,

    handleClear,
    handleFilterChange,
    handleSubmit,
    //  data,
    isError,
    isPending,
    setFieldValue,
  };
};

export default useItemsAddPage;
