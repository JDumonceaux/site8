import { useCallback, useEffect } from 'react';

import useServerApi from 'hooks/Axios/useServerApi';
import { useFormArray } from 'hooks/useFormArray';
import useSnackbar from 'hooks/useSnackbar';
import { ServiceUrl } from 'lib/utils/constants';
import type { ItemAdd, ItemAddExt } from 'types/ItemAdd';

const ITEM_COUNT = 10;

const useItemsAddPage = () => {
  const { setErrorMessage, setMessage } = useSnackbar();

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
        isSelected: false,
        lineId: index + 1,
        location: '',
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

  // Only submit updated records
  const getUpdates = useCallback(() => {
    const ret: ItemAdd[] = [];

    for (const i of getIndex()) {
      const item = getItem(i.lineId);
      if (item && (item.name?.trim().length ?? 0) > 0) {
        ret.push({
          artist: item.artist,
          description: item.description,
        });
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
    data: formValues,
    error,
    getFieldValue,
    handleChange,
    handleClear,
    handleSubmit,
    isLoading,
    setFieldValue,
  };
};

export default useItemsAddPage;
