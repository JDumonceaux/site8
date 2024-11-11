import { useEffect, useState, useTransition } from 'react';

import useImagesEdit from 'feature/imagesEdit/useImagesEdit';
import { useFormArray } from 'hooks/useFormArray';
import useSnackbar from 'hooks/useSnackbar';
import { getSRC } from 'lib/utils/helpers';
import type { Image as LocalImage } from 'types/Image';
import type { ImageEdit } from 'types/ImageEdit';
import { z } from 'zod';

// Define Zod Shape
const schema = z.object({
  artist: z.string().trim().optional(),
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
  year: z.string().trim().optional(),
});

// Create a type from the schema
export type ImageItemForm = z.infer<typeof schema> & {
  delete?: boolean;
  isDuplicate?: boolean;
  isSelected: boolean;
  localId: number;
};

const useImagesEditPage = () => {
  const [filter, setFilter] = useState<string>('sort');
  const [currentFolder, setCurrentFolder] = useState<string>('');
  const [displayData, setDisplayData] = useState<LocalImage[]>([]);
  const [artistData, setArtistData] = useState<string[]>([]);

  // move to useImagesEdit?// Is the form saving?
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const { setMessage } = useSnackbar();

  // Create a form
  const {
    formValues,
    getFieldValue,
    isSaved,
    setFieldValue,
    setFormValues,
    setIsSaved,
  } = useFormArray<ImageItemForm>();

  const { data, error, fetchData, isLoading, saveItems, scanForNewItems } =
    useImagesEdit();

  // Get all data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter and sort data
  useEffect(() => {
    const temp =
      filter && filter.length > 0
        ? data?.items.filter((x) => x.folder === filter)
        : data?.items;
    const filteredImageType = temp?.filter(
      (x) => !x.fileName.toLowerCase().includes('.heic'),
    );
    const sortedData = filteredImageType?.toSorted((a, b) => b.id - a.id);
    const trimmedData = sortedData?.slice(0, 100);
    setDisplayData(trimmedData ?? []);
  }, [filter, data?.items]);

  // Get artsit data
  useEffect(() => {
    if (data?.items) {
      const artists = data.items
        .map((item) => item.artist)
        .filter((artist): artist is string => !!artist);
      const uniqueArtists = Array.from(new Set(artists));
      setArtistData(uniqueArtists);
    }
  }, [data?.items]);

  useEffect(() => {
    // The full set of items
    setFormValues(mapDataToForm(displayData));
  }, [filter, displayData, setFormValues]);

  const mapDataToForm = (items: LocalImage[] | undefined) => {
    if (!items) {
      return [];
    }
    const ret: ImageItemForm[] | undefined = items.map((x, index) => {
      return {
        artist: x.artist ?? '',
        description: x.description ?? '',
        fileName: x.fileName || '',
        folder: x.folder ?? '',
        id: x.id || 0,
        isDuplicate: x.isDuplicate || false,
        isSelected: false,
        localId: index + 1,
        location: x.location || '',
        name: x.name || '',
        official_url: x.official_url || '',
        src: getSRC(x.folder, x.fileName),
        tags: x.tags?.join(',') || '',
        year: x.year || '',
      };
    });
    return ret;
  };

  const handleChange = (
    localId: number,
    fieldName: keyof ImageItemForm,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;
    const ischecked = (event.target as HTMLInputElement).checked;
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

  const handleSubmit = async () => {
    const updates = getUpdates();
    if (!updates) {
      setMessage('No changes to save');
      setIsProcessing(false);
      return;
    }
    // if (updates.length > 1) {
    //   setMessage('Too many changes to save');
    //   setIsProcessing(false);
    //   return;
    // }
    setMessage('Saving...');
    setIsProcessing(true);
    try {
      const result = await saveItems(updates);
      if (result) {
        setMessage('Saved');
        handleRefresh();
      } else {
        setMessage(`Error saving ${error}`);
      }
    } catch (error_) {
      if (error_ instanceof Error) {
        setMessage(`An unexpected error occurred: ${error_.message}`);
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
    const { value } = e.target;
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
      value,
    };
  };

  const getDifferenceNumber = (value?: number, update?: string) => ({
    hasChange: value !== Number(update),
    value: update ?? value,
  });

  // Only submit updated records
  const getUpdates = () => {
    const returnValue: ImageEdit[] = [];

    for (const item of displayData) {
      const items = formValues.filter((x) => x.id === item.id);
      if (items.length > 1) {
        console.warn('Duplicate items found.  Please correct index');
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
        const tempArtist = getDifferenceString(item.artist, current.artist);

        const tempYear = getDifferenceString(item.year, current.year);
        const tempTags = getDifferenceString(
          item.tags?.join(','),
          current.tags,
        );

        const hasChanges = [
          tempName.hasChange,
          tempLocation.hasChange,
          tempDescription.hasChange,
          tempOfficialUrl.hasChange,
          tempFolder.hasChange,
          tempFileName.hasChange,
          tempArtist.hasChange,
          tempYear.hasChange,
          tempTags.hasChange,
        ].some(Boolean);
        // const tempTags = getDifference(prev?.tags?.join(','), item.tags);
        // console.log('tempName', tempName);
        // console.log('tempFileName', tempFileName);
        // console.log('tempFolder', tempFolder);
        // console.log('tempLocation', tempLocation);
        // console.log('tempDescription', tempDescription);
        // console.log('tempOfficialUrl', tempOfficialUrl);
        //  console.log('hasChanges', hasChanges);

        if (hasChanges) {
          returnValue.push({
            artist: tempArtist.value,
            description: tempDescription.value,
            fileName: tempFileName.value || item.fileName,
            folder: tempFolder.value,
            id: item.id,
            location: tempLocation.value,
            name: tempName.value,
            official_url: tempOfficialUrl.value,
            tags: tempTags.value?.split(',').map((x) => x.trim()),
            year: tempYear.value,
          });
        }
      }
    }

    return returnValue.length > 0 ? returnValue : undefined;
  };

  return {
    artistData,
    currentFilter: filter,
    currentFolder,
    data: formValues,
    error,
    getFieldValue,
    handleChange,
    handleFilterSelect,
    handleFolderSelect,
    handleOnDelete,
    handleOnFolderClick,
    handleRefresh,
    handleScan,
    handleSubmit,
    isLoading,
    isPending,
    setFieldValue,
  };
};

export default useImagesEditPage;
