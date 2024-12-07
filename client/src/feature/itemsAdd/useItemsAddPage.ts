import { useCallback, useEffect } from 'react';

import useServerApi from 'hooks/Axios/useServerApi';
import { useFormArray } from 'hooks/useFormArray';
import useSnackbar from 'hooks/useSnackbar';
import { ServiceUrl } from 'lib/utils/constants';
import type { ItemAdd } from 'types/ItemAdd';
import { z } from 'zod';

// Define Zod Shape
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const schema = z.object({
  artist: z.string().trim().optional(),
  description: z.string().trim().optional(),
  id: z.number(),
  location: z
    .string({
      invalid_type_error: 'Location must be a string',
    })
    .max(250, 'Location max length exceeded: 500')
    .trim()
    .optional(),
  name: z.string().max(100, 'Name max length exceeded: 100').trim().optional(),
  official_url: z.string().trim().optional(),
  tags: z.string().trim().optional(),
  year: z.string().trim().optional(),
});

// Create a type from the schema
export type ItemExt = z.infer<typeof schema> & {
  isSelected: boolean;
  lineId: number;
};

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
  } = useFormArray<ItemExt>();

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
    const ret: ItemExt[] | undefined = Array.from(
      { length: ITEM_COUNT },
      (_, index) => ({
        artist: '',
        description: '',
        id: 0,
        isSelected: false,
        lineId: index + 1,
        location: '',
        official_url: '',
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
      setFieldValue(lineNum, id as keyof ItemExt, value);
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
    // setIsProcessing(true);
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
