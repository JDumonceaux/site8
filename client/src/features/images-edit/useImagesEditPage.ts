import { useEffect, useEffectEvent, useState, useTransition } from 'react';

import useSnackbar from '@features/app/snackbar/useSnackbar';
import useFormArray from '@hooks/useFormArray';
import { isNonEmptyString } from '@lib/utils/boolean-checks';
import { getSRC } from '@lib/utils/helpers';
import { getDefaultObject } from '@lib/utils/objectUtil';
import type { FormState, Image } from '@types';
import type { ImageAddExt } from './ImageAdd';
import useImagesEdit from './useImagesEdit';

const useImagesEditPage = (submitState: FormState<null>) => {
  const [filter, setFilter] = useState<string>('sort');
  const [currentFolder, setCurrentFolder] = useState<string>('');
  const [displayData, setDisplayData] = useState<Image[]>([]);
  const [isFilterPending, startFilterTransition] = useTransition();

  const { setMessage } = useSnackbar();

  // Create a form
  const { formValues, getFieldValue, setFieldValue, setFormValues } =
    useFormArray<ImageAddExt>();

  const { data, isError, isPending } = useImagesEdit();

  // Show messages from form submission
  useEffect(() => {
    if (submitState.message) {
      setMessage(submitState.message);
    }
  }, [submitState.message, setMessage]);

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
        ? data?.items?.filter((x) => x.folder === filter)
        : data?.items;
    const filteredImageType = temp?.filter(
      (x) =>
        typeof x.fileName === 'string' &&
        !x.fileName.toLowerCase().includes('.heic'),
    );
    const sortedData = filteredImageType?.toSorted((a, b) => b.id - a.id);
    const trimmedData = sortedData?.slice(0, 100);

    // Mark as non-urgent to keep UI responsive during filtering
    startFilterTransition(() => {
      setDisplayData(trimmedData ?? []);
    });
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
    if (isNonEmptyString(id)) {
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
    // TODO: Implement refresh logic
    // queryClient.invalidateQueries({ queryKey: ['images-edit'] });
    setMessage('Done');
  };

  const handleScan = () => {
    setMessage('Scanning...');
    // TODO: Implement scan logic
    // await scanForNewItems();
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
    getFieldValue,
    handleChange,
    handleDelete,
    handleFilterSelect,
    handleFolderChange,
    handleFolderSelect,
    handleRefresh,
    handleScan,
    isError,
    isFilterPending,
    isPending,
    setFieldValue,
  };
};

export default useImagesEditPage;
