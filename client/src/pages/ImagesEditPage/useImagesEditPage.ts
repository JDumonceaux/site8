import { useFormArray } from 'hooks/useFormArray';
import useImagesEdit from 'hooks/useImagesEdit';
import useSnackbar from 'hooks/useSnackbar';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { z } from 'zod';
import { Image } from 'types/Image';
import { ImageEdit } from 'types/ImageEdit';
import { getSRC } from 'lib/utils/helpers';

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
    // The full set of items
    setFormValues(mapDataToForm(filteredData) || []);
  }, [filter, data?.items]);

  const mapDataToForm = (items: Image[] | undefined) => {
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
    return ret.toSorted((a, b) => b.id - a.id);
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
      setMessage(`An unexpected error occurred: ${err.message}`);
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

  const getDifference = (
    previous: string | undefined,
    update: string | undefined,
  ) => {
    const temporaryPrevious =
      previous && previous?.trim().length > 0 ? previous?.trim() : undefined;
    const temporaryUpdate =
      update && update?.trim().length > 0 ? update?.trim() : undefined;
    // No change
    if (!temporaryPrevious && !temporaryUpdate) {
      return { hasChange: false, value: undefined };
    }
    // No change
    if (temporaryPrevious === temporaryUpdate) {
      return { hasChange: false, value: undefined };
    }
    if (temporaryUpdate) {
      return { hasChange: true, value: temporaryUpdate };
    }
    if (temporaryPrevious && !temporaryUpdate) {
      return { hasChange: true, value: undefined };
    }
    return { hasChange: false, value: undefined };
  };

  // Only submit updated records
  const getUpdates = () => {
    const returnValue: ImageEdit[] = [];
    if (data?.items) {
      for (const item of data?.items) {
        const rec = formValues.find((x) => x.id === item.id);
        if (rec) {
          const previous = item;
          const temporaryName = getDifference(previous.name, rec.name);
          const temporaryLocation = getDifference(
            previous.location,
            rec.location,
          );
          const temporaryDescription = getDifference(
            previous.description,
            rec.description,
          );
          const temporaryOfficialUrl = getDifference(
            previous.official_url,
            rec.official_url,
          );
          const temporaryFolder = getDifference(previous.folder, rec.folder);
          const temporaryFileName = getDifference(
            previous.fileName,
            rec.fileName,
          );
          // const tempTags = getDifference(prev?.tags?.join(','), item.tags);

          if (
            temporaryName.hasChange ||
            temporaryLocation.hasChange ||
            temporaryDescription.hasChange ||
            temporaryOfficialUrl.hasChange ||
            temporaryFolder.hasChange ||
            temporaryFileName.hasChange
          ) {
            returnValue.push({
              id: rec.id,
              description: temporaryDescription.value,
              fileName: temporaryFileName.value || rec.fileName,
              folder: temporaryFolder.value,
              location: temporaryLocation.value,
              name: temporaryName.value,
              official_url: temporaryOfficialUrl.value,
            });
          }
        }
      }
    }

    //   for (const item of formValues) {
    //     const previous = localItems?.find((x) => x.localId === item.localId);
    //     const temporaryName = getDifference(previous?.name, item.name);
    //     const temporaryLocation = getDifference(
    //       previous?.location,
    //       item.location,
    //     );
    //     const temporaryDescription = getDifference(
    //       previous?.description,
    //       item.description,
    //     );
    //     const temporaryOfficialUrl = getDifference(
    //       previous?.official_url,
    //       item.official_url,
    //     );
    //     const temporaryFolder = getDifference(previous?.folder, item.folder);
    //     const temporaryFileName = getDifference(
    //       previous?.fileName,
    //       item.fileName,
    //     );
    //     // const tempTags = getDifference(prev?.tags?.join(','), item.tags);

    //     if (
    //       temporaryName.hasChange ||
    //       temporaryLocation.hasChange ||
    //       temporaryDescription.hasChange ||
    //       temporaryOfficialUrl.hasChange ||
    //       temporaryFolder.hasChange ||
    //       temporaryFileName.hasChange
    //     ) {
    //       returnValue.push({
    //         description: temporaryDescription.hasChange
    //           ? temporaryDescription.value
    //           : previous?.description,
    //         fileName: temporaryFileName.hasChange
    //           ? (temporaryFileName.value ?? '')
    //           : (previous?.fileName ?? ''),
    //         folder: temporaryFolder.hasChange
    //           ? temporaryFolder.value
    //           : previous?.folder,
    //         id: item.id,
    //         location: temporaryLocation.hasChange
    //           ? temporaryLocation.value
    //           : previous?.location,
    //         name: temporaryName.hasChange ? temporaryName.value : previous?.name,
    //         official_url: temporaryOfficialUrl.hasChange
    //           ? temporaryOfficialUrl.value
    //           : previous?.official_url,
    //       });
    //     }
    //   }
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
