import { useCallback, useEffect } from 'react';

import useServerApi from 'hooks/Axios/useServerApi';
import { useFormArray } from 'hooks/useFormArray';
import useSnackbar from 'hooks/useSnackbar';
import { ServiceUrl } from 'lib/utils/constants';
import type { ItemEdit } from 'types';
import type { Item } from 'types/Item';
import type { Items } from 'types/Items';
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
  delete?: boolean;
  isSelected: boolean;
  lineId: number;
};

const useItemsEditPage = () => {
  const { setMessage } = useSnackbar();

  // Create a form
  const { formValues, getFieldValue, setFieldValue, setFormValues } =
    useFormArray<ItemExt>();

  const { cleanup, data, error, fetchData, isLoading, patchData } =
    useServerApi<Items>();

  // Get all data
  useEffect(() => {
    fetchData(ServiceUrl.ENDPOINT_ITEMS_EDIT);
    // Clean up if component unmounts
    return () => {
      cleanup();
    };
  }, [cleanup, fetchData]);

  useEffect(() => {
    setFormValues(mapDataToForm(data?.items));
  }, [data, setFormValues]);

  // Handle save
  const saveItems = useCallback(
    async (updates: ItemEdit[]) => {
      return patchData(ServiceUrl.ENDPOINT_ITEMS, { items: updates });
    },
    [patchData],
  );

  // Map database to form
  const mapDataToForm = (items: Item[] | undefined) => {
    if (!items) {
      return [];
    }
    const ret: ItemExt[] | undefined = items.map((x, index) => {
      return {
        artist: x.artist ?? '',
        description: x.description ?? '',
        id: x.id || 0,
        isSelected: false,
        lineId: index + 1,
        location: x.location ?? '',
        official_url: x.official_url ?? '',
        tags: x.tags?.join(',') ?? '',
      };
    });
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

  // Only submit updated records
  const getUpdates = useCallback(() => {
    const returnValue: ItemEdit[] = [];

    if (data?.items) {
      for (const item of data.items) {
        const items = formValues.filter((x) => x.id === item.id);
        if (items.length > 1) {
          // eslint-disable-next-line no-console
          console.warn('Duplicate items found.  Please correct index');
        }
        const current = formValues.find((x) => x.id === item.id);
        if (current) {
          const tempLocation = getDifferenceString(
            item.location,
            current.location,
          );
          const tempDescription = getDifferenceString(
            item.description,
            current.description,
          );
          const tempOfficialUrl = getDifferenceString(
            item.official_url,
            current.official_url,
          );
          const tempArtist = getDifferenceString(item.artist, current.artist);

          const tempTags = getDifferenceString(
            item.tags?.join(','),
            current.tags,
          );

          const hasChanges = [
            tempLocation.hasChange,
            tempDescription.hasChange,
            tempOfficialUrl.hasChange,

            tempArtist.hasChange,
            tempTags.hasChange,
          ].some(Boolean);

          if (hasChanges) {
            returnValue.push({
              artist: tempArtist.value,
              description: tempDescription.value,

              id: item.id,
              location: tempLocation.value,
              official_url: tempOfficialUrl.value,
              tags: tempTags.value?.split(',').map((x) => x.trim()),
            });
          }
        }
      }
    }

    return returnValue.length > 0 ? returnValue : undefined;
  }, [data, formValues]);

  const handleSubmit = useCallback(() => {
    const updates = getUpdates();
    if (!updates) {
      setMessage('No changes to save');
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
  }, [getUpdates, saveItems, setMessage, error]);

  const handleDelete = (lineId: number) => {
    const previous = getFieldValue(lineId, 'delete');
    setFieldValue(lineId, 'delete', !previous);
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getDifferenceString = (value?: string, update?: string) => {
    const normalizedUpdate = update?.trim() ?? undefined;

    if (value !== normalizedUpdate) {
      return {
        hasChange: true,
        value: normalizedUpdate,
      };
    }
    return {
      hasChange: false,
      value,
    };
  };

  return {
    data: formValues,
    error,
    getFieldValue,
    handleChange,
    handleDelete,
    handleSubmit,
    isLoading,
    setFieldValue,
  };
};

export default useItemsEditPage;
