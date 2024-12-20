import { useCallback, useEffect, useState, useTransition } from 'react';

import useServerApi from 'hooks/Axios/useServerApi';
import useFormArray from 'hooks/useFormArray';
import useSnackbar from 'hooks/useSnackbar';
import { ServiceUrl } from 'lib/utils/constants';
import { getSRC } from 'lib/utils/helpers';
import type { Image, Images } from 'types';

import type { ImageAdd, ImageAddExt } from './ImageAdd';
import useImages from './useImages';

const useImagesEditPage = () => {
  const [filter, setFilter] = useState<string>('sort');
  const [currentFolder, setCurrentFolder] = useState<string>('');
  const [displayData, setDisplayData] = useState<Image[]>([]);

  const [isPending, startTransition] = useTransition();
  const { setMessage } = useSnackbar();

  // Create a form
  const { formValues, getFieldValue, setFieldValue, setFormValues } =
    useFormArray<ImageAddExt>();

  const { saveItems, scanForNewItems } = useImages();

  const { cleanup, data, error, fetchData, isLoading } = useServerApi<Images>();

  // Get all data
  useEffect(() => {
    fetchData(ServiceUrl.ENDPOINT_IMAGES_EDIT);
    // Clean up if component unmounts
    return () => {
      cleanup();
    };
  }, [cleanup, fetchData]);

  // Filter and sort data
  const filterAndSortData = useCallback(() => {
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

  useEffect(() => {
    filterAndSortData();
  }, [filterAndSortData]);

  useEffect(() => {
    // The full set of items
    setFormValues(mapDataToForm(displayData));
  }, [filter, displayData, setFormValues]);

  const mapDataToForm = (items: ImageAddExt[] | undefined) => {
    if (!items) {
      return [];
    }
    const ret: ImageAddExt[] | undefined = items.map((x, index) => {
      return {
        fileName: x.fileName || '',
        folder: x.folder ?? '',
        id: x.id || 0,
        isDuplicate: x.isDuplicate ?? false,
        isSelected: false,
        itemId: x.itemId || 0,
        lineId: index + 1,
        official_url: x.official_url ?? '',
        src: getSRC(x.folder, x.fileName),
      };
    });
    return ret;
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { dataset, type, value } = event.target;
    const { id, line } = dataset;
    const lineNum = Number(line);
    //  const fieldValue = type === 'checkbox' ? checked : value;
    if (id) {
      setFieldValue(lineNum, id as keyof ImageAddExt, value);

      if (type === 'checkbox' && id === 'isSelected') {
        const { checked } = event.target as HTMLInputElement;
        setFieldValue(lineNum, 'folder', checked ? currentFolder : '');
      }
    } else {
      throw new Error('No id found');
    }
  };

  const handleRefresh = useCallback(() => {
    setMessage('Updating...');
    startTransition(() => {
      // fetchData();
    });
    setMessage('Done');
  }, [setMessage, startTransition]);

  // Only submit updated records
  const getUpdates = useCallback(() => {
    const returnValue: ImageAdd[] = [];

    for (const item of displayData) {
      const items = formValues.filter((x) => x.id === item.id);
      if (items.length > 1) {
        // eslint-disable-next-line no-console
        console.warn('Duplicate items found.  Please correct index');
      }
      const current = formValues.find((x) => x.id === item.id);
      if (current) {
        const tempOfficialUrl = getDifferenceString(
          item.official_url,
          current.official_url,
        );
        const tempFolder = getDifferenceString(item.folder, current.folder);
        const tempFileName = getDifferenceString(
          item.fileName,
          current.fileName,
        );

        const hasChanges = [
          tempOfficialUrl.hasChange,
          tempFolder.hasChange,
          tempFileName.hasChange,
        ].some(Boolean);

        if (hasChanges) {
          returnValue.push({
            fileName: tempFileName.value ?? item.fileName,
            folder: tempFolder.value,
            id: item.id,
            itemId: item.itemId,
            official_url: tempOfficialUrl.value,
          });
        }
      }
    }

    return returnValue.length > 0 ? returnValue : undefined;
  }, [displayData, formValues]);

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
          handleRefresh();
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
  }, [getUpdates, saveItems, setMessage, handleRefresh, error]);

  const handleScan = () => {
    setMessage('Scanning...');
    startTransition(() => {
      scanForNewItems();
    });
    setMessage('Done');
  };

  const handleFolderChange = (value: string | undefined) => {
    if (value) {
      setCurrentFolder((previous) => (previous === value ? '' : value));
    }
  };

  const handleDelete = (lineId: number) => {
    const previous = getFieldValue(lineId, 'delete');
    setFieldValue(lineId, 'delete', !previous);
  };

  const handleFolderSelect = (lineId: number) => {
    setFieldValue(lineId, 'folder', currentFolder);
  };

  const handleFilterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilter(value === 'all' ? '' : value);
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
    currentFilter: filter,
    currentFolder,
    data: formValues,
    error,
    getFieldValue,
    handleChange,
    handleDelete,
    handleFilterSelect,
    handleFolderChange,
    handleFolderSelect,
    handleRefresh,
    handleScan,
    handleSubmit,
    isLoading,
    isPending,
    setFieldValue,
  };
};

export default useImagesEditPage;
