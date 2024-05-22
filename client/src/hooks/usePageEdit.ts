import { useCallback, useEffect, useMemo, useState } from 'react';
import { Page } from 'services/types/Page';
import { DF_LONG, REQUIRED_FIELD, ServiceUrl } from 'utils';
import { z } from 'zod';
import { safeParse } from 'utils/zodHelper';

import { format } from 'date-fns';
import { useForm } from './useForm';
import { getDateTime } from 'utils/dateUtils';
import { useAxios } from './Axios/useAxios';

// Define Zod Shape
const pageSchema = z.object({
  id: z.number(),
  name: z
    .string({
      required_error: 'Short Title is required.',
      invalid_type_error: 'Title must be a string',
    })
    .min(1, REQUIRED_FIELD)
    .max(100, 'Max length exceeded: 100')
    .trim(),
  long_title: z
    .string({
      invalid_type_error: 'Title must be a string',
    })
    .max(250)
    .trim()
    .optional(),
  to: z.string().trim().optional(),
  url: z.string().trim().optional(),
  create_date: z.string().optional(),
  edit_date: z.string().optional(),
  // parentId: z.coerce.number().optional(),
  parent: z.string().optional(),
  reading_time: z.string().trim().optional(),
  readability_score: z.string().trim().optional(),
  text: z.string().trim(),
});

const usePageEdit = (id: string | undefined) => {
  // Use Axios to fetch data
  const { data, isLoading, error, fetchData, patchData, postData } =
    useAxios<Page>();
  // Create a type from the schema
  type FormValues = z.infer<typeof pageSchema>;
  type keys = keyof FormValues;
  // Current Item
  const [currentId, setCurrentId] = useState<number>(0);
  // Current Action
  const [currentAction, setCurrentAction] = useState<string | undefined>(
    undefined,
  );
  // Does the data need to be saved?
  const [isSaved, setIsSaved] = useState<boolean>(true);
  // Is the form saving?
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  // Return default form values
  const defaultFormValues: FormValues = useMemo(
    () => ({
      id: 0,
      name: '',
      to: '',
      url: '',
      text: '',
      long_title: '',
      edit_date: format(new Date(), DF_LONG),
      create_date: format(new Date(), DF_LONG),
      parent: '',
      reading_time: '',
      readability_score: '',
    }),
    [],
  );
  // Create a form
  const { formValues, setFormValues, setFieldValue, errors, setErrors } =
    useForm<FormValues>(defaultFormValues);
  // Keep a copy of the form values to reset
  const [originalValues, setOriginalValues] = useState<Page | undefined>(
    undefined,
  );

  // MOVE TO UTILs
  // Convert the parent array to a string
  const combineParent = useCallback(
    (item: { id?: number; seq?: number }[] | undefined): string | undefined => {
      if (!item) {
        return '';
      }
      const ret = item
        .flatMap((x) => [x.id?.toString(), x.seq?.toString()])
        .filter(Boolean);
      return ret.join(',');
    },
    [],
  );

  const splitParent = useCallback(
    (value: string | undefined): { id: number; seq: number }[] | undefined => {
      if (!value) {
        return undefined;
      }
      const x = value.trim().length > 0 ? value.trim().split(',') : undefined;
      if (!x) {
        return undefined;
      }
      return x
        .map((item, index) => {
          if (index % 2 === 0) {
            const id = parseInt(item);
            const seq = parseInt(x[index + 1]);
            if (!isNaN(id) && !isNaN(seq)) {
              return { id, seq };
            }
          }
          return undefined;
        })
        .filter(Boolean) as { id: number; seq: number }[];
    },
    [],
  );

  // Update the form values from the data
  const updateFormValues = useCallback(
    (items: Page | undefined | null) => {
      if (items) {
        const item: FormValues = {
          id: items.id,
          name: items.name ?? '',
          to: items.to ?? '',
          url: items.url ?? '',
          text: items.text ?? '',
          long_title: items.long_title ?? '',
          edit_date:
            (items.edit_date && format(items.edit_date, DF_LONG)) ??
            format(new Date(), DF_LONG),
          create_date:
            (items.create_date && format(items.create_date, DF_LONG)) ??
            format(new Date(), DF_LONG),
          parent: combineParent(items.parent),
          reading_time: items.reading_time ?? '',
          readability_score: items.readability_score ?? '',
        };
        setFormValues(item);
      }
    },
    [combineParent, setFormValues],
  );

  // Get the data if the params change
  useEffect(() => {
    if (id) {
      const tempId = parseInt(id ?? '');
      if (!isNaN(tempId) && tempId > 0) {
        setCurrentId(tempId);
      }
      if (['first', 'last', 'next', 'prev'].includes(id)) {
        setCurrentAction(id);
      }
    }
  }, [id]);

  // Fetch data when currentId changes
  useEffect(() => {
    if (currentId > 0) {
      fetchData(`${ServiceUrl.ENDPOINT_PAGE}/${currentId}`);
    }
  }, [currentId]);

  // Fetch data when currentAction changes
  useEffect(() => {
    if (currentAction) {
      fetchData(`${ServiceUrl.ENDPOINT_PAGE}/${currentId}/${currentAction}`);
    }
  }, [currentAction]);

  // Update the form values when the data changes
  useEffect(() => {
    updateFormValues(data);
    setOriginalValues(data);
  }, [data, updateFormValues]);

  // Validate form
  const validateForm = useCallback(() => {
    const result = safeParse<FormValues>(pageSchema, formValues);
    setErrors(result.errorFormatted);
    return result.success;
  }, [formValues, setErrors]);

  // Handle reset form
  const resetForm = useCallback(() => {
    updateFormValues(originalValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(null);
  }, [originalValues, setFormValues]);

  // Handle clear form
  const clearForm = useCallback(() => {
    setFormValues(defaultFormValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(null);
  }, [defaultFormValues, setFormValues]);

  // Handle clear form
  const handleClear = useCallback(() => {
    clearForm();
  }, []);

  // Handle form reset
  const handleReset = useCallback(() => {
    resetForm();
  }, []);

  // Handle field change
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
      setIsSaved(false);
    },
    [formValues.to?.length, setFormValues],
  );

  // Handle save
  const saveItem = useCallback(
    async (items: FormValues) => {
      const { id, create_date, edit_date, parent, ...rest } = items;
      const data =
        id > 0
          ? {
              ...rest,
              id,
              parent: splitParent(parent),
              edit_date: getDateTime(edit_date) ?? new Date(),
            }
          : {
              ...rest,
              id,
              parent: splitParent(parent),
              edit_date: getDateTime(edit_date) ?? new Date(),
              create_date: getDateTime(create_date) ?? new Date(),
            };
      if (data.id > 0) {
        await patchData(`${ServiceUrl.ENDPOINT_PAGE}`, data);
      } else {
        await postData(`${ServiceUrl.ENDPOINT_PAGE}`, data);
      }
      return true;
    },
    [patchData, postData, splitParent],
  );

  // Handle form submission
  const submitForm = useCallback((): boolean => {
    setIsProcessing(true);
    if (validateForm()) {
      saveItem(formValues);
      setIsProcessing(false);
      setIsSaved(true);
      return true;
    }
    return false;
  }, [formValues, saveItem, validateForm]);

  const setId = useCallback(
    (value: string | undefined) => {
      if (value) {
        const id = parseInt(value);
        if (!isNaN(id) || id > 0) {
          setFieldValue('id', id);
        }
      }
    },
    [setFieldValue],
  );

  const getFieldErrors = useCallback(
    (fieldName: keys) => {
      return errors && errors[fieldName]?._errors;
    },
    [errors],
  );

  const hasError = useCallback(
    (fieldName: keys) => {
      return !getFieldErrors(fieldName);
    },
    [getFieldErrors],
  );

  const getStandardTextInputAttributes = useCallback(
    (fieldName: keys) => {
      return {
        id: fieldName,
        errorText: getFieldErrors(fieldName),
        hasError: hasError(fieldName),
        value: formValues[fieldName],
      };
    },
    [getFieldErrors, hasError, formValues],
  );

  return useMemo(
    () => ({
      pageSchema,
      formValues,
      isProcessing,
      getFieldErrors,
      getStandardTextInputAttributes,
      hasError,
      setFormValues,
      setFieldValue,
      setId,
      handleClear,
      handleChange,
      handleReset,
      submitForm,
      isLoading,
      error,
      isSaved,
    }),
    [
      formValues,
      isProcessing,
      getFieldErrors,
      getStandardTextInputAttributes,
      hasError,
      setFormValues,
      setFieldValue,
      setId,
      handleChange,
      submitForm,
      handleReset,
      isLoading,
      error,
      isSaved,
    ],
  );
};

export default usePageEdit;
