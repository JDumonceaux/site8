import { useEffect, useEffectEvent, useState, useTransition } from 'react';

import useSnackbar from '@features/app/snackbar-temp/useSnackbar';
import useFormArray from '@hooks/useFormArray';
import { getSRC } from '@lib/utils/helpers';
import { getDefaultObject } from '@lib/utils/objectUtil';
import type { Image } from '@shared/types';
import type { ImageAddExt } from './ImageAdd';
import useImagesEdit from './useImagesEdit';

const useImagesEditPage = () => {
  const [filter, setFilter] = useState<string>('sort');
  const [currentFolder, setCurrentFolder] = useState<string>('');
  const [displayData, setDisplayData] = useState<Image[]>([]);

  const [isPending, startTransition] = useTransition();
  const { setMessage } = useSnackbar();

  // Create a form
  const { formValues, getFieldValue, setFieldValue, setFormValues } =
    useFormArray<ImageAddExt>();

  const { data, isError } = useImagesEdit();

  // Map data to form values (move above usage)
  const mapDataToForm = (items: Image[] | undefined) => {
    if (!items) {
      return [];
    }
    const defaultExt: ImageAddExt = {
      delete: false,
      fileName: '',
      folder: '',
      id: 0,
      isDuplicate: false,
      isSelected: false,
      itemId: 0,
      lineId: 0,
      official_url: '',
      src: '',
    };
    const returnValue: ImageAddExt[] | undefined = items.map((x, index) => {
      const temp = getDefaultObject(defaultExt) as ImageAddExt;
      return {
        ...temp,
        ...x,
        lineId: index + 1,
        src: getSRC(x.folder, x.fileName),
      };
    });
    return returnValue;
  };

  // Filter and sort data
  const filterAndSortData = () => {
    const temp =
      filter && filter.length > 0
        ? data?.items.filter((x) => x.folder === filter)
        : data?.items;
    const filteredImageType = temp?.filter(
      (x) =>
        typeof x.fileName === 'string' &&
        !x.fileName.toLowerCase().includes('.heic'),
    );
    const sortedData = filteredImageType?.toSorted((a, b) => b.id - a.id);
    const trimmedData = sortedData?.slice(0, 100);
    setDisplayData(trimmedData ?? []);
  };

  const filterAndSortDataEvent = useEffectEvent(() => {
    filterAndSortData();
  });
  useEffect(() => {
    filterAndSortDataEvent();
  }, [filter, data?.items]);

  useEffect(() => {
    // The full set of items
    const temp = mapDataToForm(displayData);
    setFormValues(temp);
    // setOriginalValues(temp); // Avoid cascading renders
  }, [displayData, setFormValues]);

  // (removed duplicate mapDataToForm)

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { dataset, type, value } = event.target;
    const { id, line } = dataset;
    const lineNumber = Number(line);
    //  const fieldValue = type === 'checkbox' ? checked : value;
    if (id) {
      setFieldValue(lineNumber, id as keyof ImageAddExt, value);

      if (type === 'checkbox' && id === 'isSelected') {
        const { checked } = event.target as HTMLInputElement;
        setFieldValue(lineNumber, 'folder', checked ? currentFolder : '');
      }
    } else {
      throw new Error('No id found');
    }
  };

  const handleRefresh = () => {
    setMessage('Updating...');
    startTransition(() => {
      // fetchData();
    });
    setMessage('Done');
  };

  // Only submit updated records
  // Removed getUpdates and all originalValues logic

  const handleSubmit = () => {
    setMessage('Saving...');
    // setIsProcessing(true);
    // saveItems()
    //   .then((result) => {
    //     if (result) {
    //       setMessage('Saved');
    //       handleRefresh();
    //     } else {
    //       setMessage(`Error saving ${error}`);
    //     }
    //   })
    //   .catch((error_: unknown) => {
    //     if (error_ instanceof Error) {
    //       setMessage(`An unexpected error occurred: ${error_.message}`);
    //     } else {
    //       setMessage('An unexpected error occurred');
    //     }
    //   })
    //   .finally(() => {
    //     //   setIsProcessing(false);
    //   });
  };

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
