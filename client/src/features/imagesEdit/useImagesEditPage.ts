import { useCallback, useEffect, useState, useTransition } from 'react';

import useSnackbar from 'features/app/Snackbar/useSnackbar';
import useFormArray from 'hooks/useFormArray';
import { getSRC } from 'lib/utils/helpers';
import { getDefaultObject, isDeepEqual } from 'lib/utils/objectUtil';
import type { Image } from 'types';

import type { ImageAdd, ImageAddExt } from './ImageAdd';
import useImagesEdit from './useImagesEdit';

const useImagesEditPage = () => {
  const [filter, setFilter] = useState<string>('sort');
  const [currentFolder, setCurrentFolder] = useState<string>('');
  const [displayData, setDisplayData] = useState<Image[]>([]);
  const [originalValues, setOriginalValues] = useState<ImageAddExt[]>([]);

  const [isPending, startTransition] = useTransition();
  const { setMessage } = useSnackbar();

  // Create a form
  const { formValues, getFieldValue, setFieldValue, setFormValues } =
    useFormArray<ImageAddExt>();

  const { data, isError } = useImagesEdit();

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
    const temp = mapDataToForm(displayData);
    setFormValues(temp);
    setOriginalValues(temp);
  }, [displayData, setFormValues]);

  const mapDataToForm = (items: Image[] | undefined) => {
    if (!items) {
      return [];
    }
    const ret: ImageAddExt[] | undefined = items.map((x, index) => {
      const temp = getDefaultObject() as ImageAddExt;
      return {
        ...temp,
        ...x,
        lineId: index + 1,
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

    // loop through originals
    for (const item of originalValues) {
      const current = formValues.find((x) => x.id === item.id);

      if (current) {
        const isEqual = isDeepEqual(item, current);
        if (!isEqual) {
          returnValue.push({
            fileName: item.fileName,
            folder: item.folder,
            id: item.id,
            itemId: item.itemId,
            official_url: item.official_url,
          });
        }
      }
    }

    return returnValue.length > 0 ? returnValue : undefined;
  }, [formValues, originalValues]);

  const handleSubmit = useCallback(() => {
    const updates = getUpdates();
    if (!updates) {
      setMessage('No changes to save');
      return;
    }
    setMessage('Saving...');
    // setIsProcessing(true);

    // saveItems(updates)
    //   // eslint-disable-next-line promise/prefer-await-to-then
    //   .then((result) => {
    //     // eslint-disable-next-line promise/always-return
    //     if (result) {
    //       setMessage('Saved');
    //       handleRefresh();
    //     } else {
    //       setMessage(`Error saving ${error}`);
    //     }
    //   })
    //   // eslint-disable-next-line promise/prefer-await-to-then
    //   .catch((error_: unknown) => {
    //     if (error_ instanceof Error) {
    //       setMessage(`An unexpected error occurred: ${error_.message}`);
    //     } else {
    //       setMessage('An unexpected error occurred');
    //     }
    //   })
    //   // eslint-disable-next-line promise/prefer-await-to-then
    //   .finally(() => {
    //     //   setIsProcessing(false);
    //   });
  }, [getUpdates, setMessage]);

  const handleScan = () => {
    setMessage('Scanning...');
    startTransition(() => {
      //  scanForNewItems();
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

  // const getDifferenceString = (value?: string, update?: string) => {
  //   const normalizedUpdate = update?.trim() ?? undefined;

  //   if (value !== normalizedUpdate) {
  //     return {
  //       hasChange: true,
  //       value: normalizedUpdate,
  //     };
  //   }
  //   return {
  //     hasChange: false,
  //     value,
  //   };
  // };

  return {
    currentFilter: filter,
    currentFolder,
    data: formValues,
    // isPending,
    getFieldValue,
    handleChange,
    handleDelete,
    handleFilterSelect,
    handleFolderChange,
    handleFolderSelect,
    handleRefresh,
    handleScan,
    handleSubmit,
    // data,
    isError,
    isPending,
    setFieldValue,
  };
};

export default useImagesEditPage;
