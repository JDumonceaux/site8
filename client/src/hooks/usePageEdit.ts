import { useCallback, useEffect, useMemo, useState } from 'react';
import { Page } from 'services/types/Page';
import { DF_LONG, REQUIRED_FIELD, ServiceUrl } from 'utils';
import { z } from 'zod';
import { safeParse } from 'utils/zodHelper';

import { format } from 'date-fns';
import { useForm } from './useForm';
import { getDateTime } from 'utils/dateUtils';
import { useAxios } from './Axios/useAxios';
import { combineParent, splitParent } from 'utils/helpers';

// Define Zod Shape
const pageSchema = z
  .object({
    id: z.number(),
    name: z
      .string({
        required_error: 'Name is required.',
        invalid_type_error: 'Name must be a string',
      })
      .min(1, REQUIRED_FIELD)
      .max(500, 'Name max length exceeded: 500')
      .trim(),

    to: z.string().trim().optional(),
    url: z.string().trim().optional(),
    create_date: z.string().optional(),
    edit_date: z.string().optional(),
    parent: z.string().min(1, REQUIRED_FIELD),
    reading_time: z.string().trim().optional(),
    readability_score: z.string().trim().optional(),
    text: z.string().trim(),
  })
  .refine(
    (data) => data.to || data.url,
    'Either to or url should be filled in.',
  );
const usePageEdit = () => {
  // Use Axios to fetch data
  const { data, isLoading, error, fetchData, patchData, postData } =
    useAxios<Page>();
  // Create a type from the schema
  type FormValues = z.infer<typeof pageSchema>;
  type keys = keyof FormValues;
  // Does the data need to be saved?
  const [isSaved, setIsSaved] = useState<boolean>(true);
  // Is the form saving?
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  // Is the form saving?
  const [processError, setProcessError] = useState<string | undefined>(
    undefined,
  );
  // Return default form values
  const defaultFormValues: FormValues = useMemo(
    () => ({
      id: 0,
      name: '',
      to: '',
      url: '',
      text: '',
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
  // Keep a copy of the original values to reset
  const [originalValues, setOriginalValues] = useState<Page | undefined>(
    undefined,
  );

  // Update the form values
  const updateFormValues = useCallback(
    (items: Page | undefined | null) => {
      if (items) {
        const item: FormValues = {
          id: items.id,
          name: items.name ?? '',
          to: items.to ?? '',
          url: items.url ?? '',
          text: items.text ?? '',
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
        console.log('item', item);
      }
    },
    [setFormValues],
  );

  // Update the form values when the data changes
  useEffect(() => {
    updateFormValues(data);
    setOriginalValues(data);
  }, [data, updateFormValues]);

  const fetchItem = useCallback((id: number) => {
    fetchData(`${ServiceUrl.ENDPOINT_PAGE}/${id.toString()}`);
  }, []);

  // Validate form
  const validateForm = useCallback(() => {
    const result = safeParse<FormValues>(pageSchema, formValues);
    setErrors(result.errorFormatted);
    return result.success;
  }, [formValues, setErrors]);

  // Handle change action
  const handleAction = useCallback(
    (id: number, action: string) => {
      fetchData(`${ServiceUrl.ENDPOINT_PAGE}/${id.toString()}/${action}`);
    },
    [fetchData],
  );

  // Handle clear form
  const handleClear = useCallback(() => {
    setFormValues(defaultFormValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(null);
  }, [defaultFormValues, setErrors, setFormValues]);

  // Handle form reset
  const handleReset = useCallback(() => {
    updateFormValues(originalValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(null);
  }, [originalValues, setErrors, updateFormValues]);

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
    [setFormValues],
  );

  const updateField = useCallback(
    (fieldName: string, value: string) => {
      setFormValues((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
      setIsSaved(false);
    },
    [setFormValues],
  );

  // Handle save
  const saveItem = useCallback(
    async (items: FormValues) => {
      setProcessError(undefined);
      const { id, create_date, edit_date, parent, ...rest } = items;
      const data = {
        ...rest,
        id,
        parent: splitParent(parent),
        edit_date: getDateTime(edit_date) ?? new Date(),
        create_date:
          id == 0 ? getDateTime(create_date) ?? new Date() : undefined,
      };

      const results =
        data.id > 0
          ? await patchData(`${ServiceUrl.ENDPOINT_PAGE}`, data)
          : await postData(`${ServiceUrl.ENDPOINT_PAGE}`, data);
      setProcessError(undefined);
      return true;
    },
    [patchData, postData],
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
      handleAction,
      handleClear,
      handleChange,
      handleReset,
      submitForm,
      isLoading,
      error,
      isSaved,
      fetchItem,
      updateField,
    }),
    [
      formValues,
      isProcessing,
      getFieldErrors,
      getStandardTextInputAttributes,
      hasError,
      setFormValues,
      setFieldValue,
      handleAction,
      handleClear,
      handleChange,
      handleReset,
      submitForm,
      isLoading,
      error,
      isSaved,
      fetchItem,
      updateField,
    ],
  );
};

export default usePageEdit;
