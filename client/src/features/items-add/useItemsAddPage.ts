import {
  useActionState,
  useEffect,
  useEffectEvent,
  useOptimistic,
  useState,
} from 'react';

import useSnackbar from '@features/app/snackbar/useSnackbar';
import { useAxios } from '@hooks/axios/useAxios';
import useFormArray from '@hooks/useFormArray';
import { ServiceUrl } from '@lib/utils/constants';
import { logError } from '@lib/utils/errorHandler';
import { removeEmptyAttributesArray } from '@lib/utils/objectUtil';
import type { ItemAdd, ItemAddExt } from './ItemAdd';

const ITEM_COUNT = 10;

type FormState = {
  message?: string;
  success?: boolean;
};

type UseItemsAddPageReturn = {
  readonly actionState: FormState;
  readonly artistId: string;
  readonly data: ItemAddExt[];
  readonly formAction: (formData: FormData) => void;
  readonly getFieldValue: (
    lineId: number,
    fieldName: keyof ItemAddExt,
  ) => string;
  readonly handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  readonly handleClear: () => void;
  readonly handleFilterChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  readonly isPending: boolean;
  readonly isLoading: boolean;
  readonly isSaving: boolean;
  readonly setFieldValue: (
    lineId: number,
    fieldName: keyof ItemAddExt,
    value: boolean | null | number | string,
  ) => void;
};

/**
 * Custom hook for managing the items add page state and operations
 * @returns State and handlers for the items add page
 */
const useItemsAddPage = (): UseItemsAddPageReturn => {
  const { setMessage } = useSnackbar();
  const [artistId, setArtistId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [optimisticSaving, setOptimisticSaving] = useOptimistic(
    isSaving,
    (_state, newValue: boolean) => newValue,
  );

  const {
    formValues,
    getFieldValue,
    getIndex,
    getItem,
    setFieldValue,
    setFormValues,
  } = useFormArray<ItemAddExt>();

  const { error, isLoading, putData } = useAxios<unknown>();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setArtistId(event.target.value);
  };

  const createDefaultItem = (lineId: number): ItemAddExt => ({
    artisticPeriod: '',
    description: '',
    lineId,
    location: '',
    officialWebAddress: '',
    tags: '',
    title: '',
    year: '',
  });

  const setInitialItemsEvent = useEffectEvent(() => {
    const items = Array.from({ length: ITEM_COUNT }, (_, index) =>
      createDefaultItem(index + 1),
    );
    setFormValues(items);
  });
  useEffect(() => {
    setInitialItemsEvent();
  }, []);

  const handleClear = () => {
    const items = Array.from({ length: ITEM_COUNT }, (_, index) =>
      createDefaultItem(index + 1),
    );
    setFormValues(items);
  };

  const saveItems = async (updates: ItemAdd[]) => {
    const cleanedData = removeEmptyAttributesArray(updates);
    return putData(ServiceUrl.ENDPOINT_ITEMS, cleanedData);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { dataset, value } = event.target;
    const { id, line } = dataset;

    if (!id || !line) {
      logError(
        new Error('Missing data attributes'),
        {
          componentName: 'useItemsAddPage',
          id,
          line,
          operation: 'handleChange',
        },
        'warning',
      );
      return;
    }

    const lineNumber = Number(line);
    if (Number.isNaN(lineNumber)) {
      logError(
        new Error('Invalid line number'),
        { componentName: 'useItemsAddPage', line, operation: 'handleChange' },
        'warning',
      );
      return;
    }

    setFieldValue(lineNumber, id as keyof ItemAddExt, value);
  };

  const getUpdates = (): ItemAdd[] | null => {
    const artistIdNumber = Number(artistId);

    if (!artistIdNumber || Number.isNaN(artistIdNumber)) {
      logError(
        new Error('Invalid artist ID'),
        { artistId, componentName: 'useItemsAddPage', operation: 'getUpdates' },
        'warning',
      );
      return null;
    }

    const items: ItemAdd[] = [];

    for (const index of getIndex()) {
      const item = getItem(index.lineId);
      if (!item) {
        continue;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { lineId, ...rest } = item;
      const newItem: ItemAdd = { ...rest, artistId: artistIdNumber };

      // Check if all values are empty
      const isEmpty = Object.values(newItem).every(
        (value) => value === '' || value === 0,
      );

      if (!isEmpty) {
        items.push(newItem);
      }
    }

    // Filter out items without a title
    const filtered = items.filter((item) => item.title.trim() !== '');
    return filtered.length > 0 ? filtered : null;
  };

  // Action function for useActionState
  const submitAction = async (
    _prevState: FormState,
    _formData: FormData,
  ): Promise<FormState> => {
    try {
      const updates = getUpdates();

      if (!updates) {
        return {
          message:
            'No valid items to save. Please ensure all items have a title.',
          success: false,
        };
      }

      // Optimistically show saving state
      setOptimisticSaving(true);
      setMessage('Saving...');

      const cleanedData = removeEmptyAttributesArray(updates);
      const result = await putData(ServiceUrl.ENDPOINT_ITEMS, cleanedData);

      if (result) {
        setIsSaving(false);
        setMessage('Items saved successfully');
        return { message: 'Items saved successfully', success: true };
      } else {
        setIsSaving(false);
        const errorMessage = error
          ? `Error saving: ${error}`
          : 'Error saving items';
        setMessage(errorMessage);
        return { message: errorMessage, success: false };
      }
    } catch (error_: unknown) {
      // Revert optimistic state on error
      setIsSaving(false);
      const errorMessage =
        error_ instanceof Error
          ? `An unexpected error occurred: ${error_.message}`
          : 'An unexpected error occurred';
      setMessage(errorMessage);
      logError(error_, {
        componentName: 'useItemsAddPage',
        operation: 'submitAction',
      });
      return { message: errorMessage, success: false };
    }
  };

  const [actionState, formAction, isPending] = useActionState<
    FormState,
    FormData
  >(submitAction, {});

  return {
    actionState,
    artistId,
    data: formValues,
    formAction,
    getFieldValue,
    handleChange,
    handleClear,
    handleFilterChange,
    isPending,
    isSaving: optimisticSaving,
    isLoading,
    setFieldValue,
  };
};

export default useItemsAddPage;
