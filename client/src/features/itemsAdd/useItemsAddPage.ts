import { useCallback, useEffect, useState } from 'react';

import type { ItemAdd, ItemAddExt } from 'features/itemsAdd/ItemAdd';
import useServerApi from 'hooks/Axios/useServerApi';
import useFormArray from 'hooks/useFormArray';
import useSnackbar from 'hooks/useSnackbar';
import { ServiceUrl } from 'lib/utils/constants';

const ITEM_COUNT = 10;

const useItemsAddPage = () => {
  const { setErrorMessage, setMessage } = useSnackbar();
  const [currentFilter, setCurrentFilter] = useState('');

  // Create a form
  const {
    formValues,
    getFieldValue,
    getIndex,
    getItem,
    setFieldValue,
    setFormValues,
  } = useFormArray<ItemAddExt>();

  const { error, isLoading, putData } = useServerApi<ItemAdd[]>();

  useEffect(() => {
    setFormValues(mapDataToForm());
  }, [setFormValues]);

  // Handle save
  const saveItems = useCallback(
    async (updates: ItemAdd[]) => {
      return putData(ServiceUrl.ENDPOINT_ITEMS, updates);
    },
    [putData],
  );

  // Map database to form
  const mapDataToForm = () => {
    const ret: ItemAddExt[] | undefined = Array.from(
      { length: ITEM_COUNT },
      (_, index) => ({
        artist: '',
        description: '',
        lineId: index + 1,
        location: '',
        name: '',
        official_url: '',
        period: '',
        tags: '',
      }),
    );
    return ret;
  };

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

  const handleSetFilter = () => {
    setCurrentFilter(getFieldValue(1, 'artist'));
  };

  // Only submit updated records
  const getUpdates = useCallback(() => {
    const ret: ItemAdd[] = [];
    for (const i of getIndex()) {
      const item: ItemAddExt | null = getItem(i.lineId);
      if (item) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { lineId, ...rest } = item;
        const newItem: ItemAdd = { ...rest };
        // Check for empty objects
        const isEmpty = Object.values(newItem).every((x) => x === '');
        if (!isEmpty) {
          ret.push(newItem);
        }
      }
    }
    return ret.length > 0 ? ret : undefined;
  }, [getIndex, getItem]);

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
    currentFilter,
    data: formValues,
    error,
    getFieldValue,
    handleChange,
    handleClear,
    handleSetFilter,
    handleSubmit,
    isLoading,
    setFieldValue,
  };
};

export default useItemsAddPage;
