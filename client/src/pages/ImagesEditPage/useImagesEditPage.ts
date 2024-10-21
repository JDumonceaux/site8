import { useFormArray } from 'hooks/useFormArray';
import useImagesEdit from 'hooks/useImagesEdit';
import useSnackbar from 'hooks/useSnackbar';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { z } from 'zod';
import { Image as LocalImage } from 'types/Image';
import { ImageEdit } from 'types/ImageEdit';
import { getSRC } from 'lib/utils/helpers';
import { set } from 'date-fns';

// Define Zod Shape
const schema = z.object({
  description: z.string().trim().optional(),
  fileName: z.string().trim(),
  folder: z.string().trim().optional(),
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
  src: z.string().optional(),
  tags: z.string().trim().optional(),
});

// Create a type from the schema
export type ImageItemForm = z.infer<typeof schema> & {
  delete?: boolean;
  isDuplicate?: boolean;
  localId: number;
  isSelected: boolean;
};

const useImagesEditPage = () => {
  const [filter, setFilter] = useState<string>('sort');
  const [currentFolder, setCurrentFolder] = useState<string>('');
  const [filteredData, setFilteredData] = useState<LocalImage[]>([]);

  // move to useImagesEdit?// Is the form saving?
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const { setMessage } = useSnackbar();

  // Create a form
  const {
    formValues,
    isSaved,
    setIsSaved,
    getFieldValue,
    setFieldValue,
    setFormValues,
  } = useFormArray<ImageItemForm>();

  const { data, error, fetchData, saveItems, isLoading, scanForNewItems } =
    useImagesEdit();

  // Get all data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const filteredData =
      filter && filter.length > 0
        ? data?.items.filter((x) => x.folder === filter)
        : data?.items;
    const sortedData = filteredData?.toSorted((a, b) => b.id - a.id);
    const trimmedData = sortedData?.slice(0, 10);
    setFilteredData(trimmedData || []);
  }, [filter, data?.items]);

  console.log('filteredData', filteredData);

  useEffect(() => {
    // The full set of items
    setFormValues(mapDataToForm(filteredData) || []);
  }, [filter, filteredData]);

  const mapDataToForm = (items: LocalImage[] | undefined) => {
    if (!items) {
      return [];
    }
    const ret: ImageItemForm[] | undefined = items?.map((x, index) => {
      return {
        localId: index + 1,
        description: x.description || '',
        fileName: x.fileName || '',
        folder: x.folder || '',
        id: x.id || 0,
        location: x.location || '',
        name: x.name || '',
        official_url: x.official_url || '',
        src: getSRC(x.folder, x.fileName),
        tags: '',
        isSelected: false,
        isDuplicate: x.isDuplicate || false,
      };
    });
    return ret;
  };

  const handleChange = (
    localId: number,
    fieldName: keyof ImageItemForm,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    const ischecked = (<HTMLInputElement>event.target).checked;
    setFieldValue(localId, fieldName, value || ischecked);
    if (fieldName === 'isSelected') {
      if (ischecked) {
        setFieldValue(localId, 'folder', currentFolder);
      } else {
        setFieldValue(localId, 'folder', '');
      }
    }
  };

  const handleRefresh = () => {
    setMessage('Updating...');
    startTransition(() => {
      fetchData();
    });
    setMessage('Done');
  };

  const submitForm = () => {
    const updates = getUpdates();
    console.log('updates', updates);
    //return saveItems(updates);
    return Promise.resolve;
  };

  const handleSubmit = () => {
    console.log('Here');
    // e.stopPropagation();
    // e.preventDefault();
    setMessage('Saving...');
    setIsProcessing(true);

    try {
      const result = submitForm();
      //if (result) {
      setMessage('Saved');
      // } else {
      //   setMessage(`Error saving ${error}`);
      // }
    } catch (err) {
      if (err instanceof Error) {
        setMessage(`An unexpected error occurred: ${err.message}`);
      } else {
        setMessage('An unexpected error occurred');
      }
    } finally {
      setIsProcessing(false);
    }
    // if (result) {
    //   handleRefresh();
    // }
  };

  const handleScan = () => {
    setMessage('Scanning...');
    startTransition(() => {
      scanForNewItems();
    });
    setMessage('Done');
  };

  const handleOnFolderClick = (value: string) => {
    setCurrentFolder((previous) => (previous === value ? '' : value));
  };

  const handleOnDelete = (localId: number) => {
    const previous = getFieldValue(localId, 'delete');
    setFieldValue(localId, 'delete', !previous);
  };

  const handleFolderSelect = (localId: number) => {
    setFieldValue(localId, 'folder', currentFolder);
  };

  const handleFilterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilter(value === 'all' ? '' : value);
  };

  const handleClear = () => {
    setIsSaved(true);
    setIsProcessing(false);
  };

  const getDifferenceString = (value?: string, update?: string) => {
    const normalizedUpdate = update
      ? update.trim() === ''
        ? undefined
        : update
      : undefined;
    if (value !== normalizedUpdate) {
      return {
        hasChange: true,
        value: normalizedUpdate,
      };
    }
    return {
      hasChange: false,
      value: value,
    };
  };

  const getDifferenceNumber = (value?: number, update?: string) => ({
    hasChange: value !== Number(update),
    value: update ?? value,
  });

  // Only submit updated records
  const getUpdates = () => {
    const returnValue: ImageEdit[] = [];
    if (filteredData) {
      for (const item of filteredData) {
        const items = formValues.filter((x) => x.id === item.id);
        if (items.length > 1) {
          console.error('Duplicate items found.  Please correct index');
        }
        const current = items[0];
        if (current) {
          const tempName = getDifferenceString(item.name, current.name);

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
          const tempFolder = getDifferenceString(item.folder, current.folder);
          const tempFileName = getDifferenceString(
            item.fileName,
            current.fileName,
          );
          // const tempTags = getDifference(prev?.tags?.join(','), item.tags);
          console.log('tempName', tempName);
          console.log('tempLocation', tempLocation);
          console.log('tempDescription', tempDescription);
          console.log('tempOfficialUrl', tempOfficialUrl);
          console.log('tempFolder', tempFolder);
          console.log('tempFileName', tempFileName);

          const hasChanges = [
            tempName.hasChange,
            tempLocation.hasChange,
            tempDescription.hasChange,
            tempOfficialUrl.hasChange,
            tempFolder.hasChange,
            tempFileName.hasChange,
          ].some(Boolean);

          if (hasChanges) {
            returnValue.push({
              id: rec.id,
              description: tempDescription.value,
              fileName: tempFileName.value || rec.fileName,
              folder: tempFolder.value,
              location: tempLocation.value,
              name: tempName.value,
              official_url: tempOfficialUrl.value,
            });
          }
        }
      }
    }

    return returnValue;
  };

  return {
    currentFolder,
    currentFilter: filter,
    data: formValues,
    error,
    isPending,
    isLoading,
    getFieldValue,
    setFieldValue,
    handleOnFolderClick,
    handleOnDelete,
    handleFilterSelect,
    handleFolderSelect,
    handleRefresh,
    handleScan,
    handleSubmit,
    handleChange,
  };
};

export default useImagesEditPage;
