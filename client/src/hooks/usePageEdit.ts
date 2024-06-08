import { useCallback, useEffect, useMemo } from 'react';
import { Page } from 'types/Page';
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

// Create a type from the schema
export type FormValues = z.infer<typeof pageSchema>;
export type keys = keyof FormValues;

const usePageEdit = () => {
  // Use Axios to fetch data
  const { data, isLoading, error, fetchData, patchData, postData } =
    useAxios<Page>();

  // Return default form values
  const initialFormValues: FormValues = useMemo(
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
  const {
    hasError,
    formValues,
    isSaved,
    isProcessing,
    handleChange,
    handleClear,
    handleReset,
    setFieldValue,
    setErrors,
    setIsSaved,
    setIsProcessing,
    getFieldErrors,
    setAllValues,
    setInitialFormValues,
  } = useForm<FormValues>(initialFormValues);

  // Map page to form values
  const mapPageToFormValues = useCallback(
    (item: Page | undefined | null): FormValues | undefined => {
      if (item) {
        const ret = {
          id: item.id,
          name: item.name ?? '',
          to: item.to ?? '',
          url: item.url ?? '',
          text: item.text ?? '',
          edit_date:
            (item.edit_date && format(item.edit_date, DF_LONG)) ??
            format(new Date(), DF_LONG),
          create_date:
            (item.create_date && format(item.create_date, DF_LONG)) ??
            format(new Date(), DF_LONG),
          parent: combineParent(item.parent),
          reading_time: item.reading_time ?? '',
          readability_score: item.readability_score ?? '',
        };
        return ret;
      }
      return undefined;
    },
    [],
  );

  // Update the form values when the data changes
  useEffect(() => {
    const values = mapPageToFormValues(data);
    if (values) {
      setAllValues(values);
      setInitialFormValues(values);
    }
  }, [data, mapPageToFormValues, setAllValues, setInitialFormValues]);

  const fetchItem = useCallback(
    (id: number) => {
      fetchData(`${ServiceUrl.ENDPOINT_PAGE}/${id.toString()}`);
    },
    [fetchData],
  );

  // Validate form
  const validateForm = useCallback(() => {
    const result = safeParse<FormValues>(pageSchema, formValues);
    setErrors(result.error?.issues);
    return result.success;
  }, [formValues, setErrors]);

  // Handle change action
  const handleAction = useCallback(
    (id: number, action: string) => {
      fetchData(`${ServiceUrl.ENDPOINT_PAGE}/${id.toString()}/${action}`);
    },
    [fetchData],
  );

  // Handle save
  const submitForm = useCallback(async () => {
    setIsProcessing(true);
    const { id, create_date, edit_date, parent, ...rest } = formValues;
    const data: Page = {
      ...rest,
      id,
      parent: splitParent(parent),
      edit_date: getDateTime(edit_date) ?? new Date(),
      create_date: id == 0 ? getDateTime(create_date) ?? new Date() : undefined,
      seq: 0,
      type: 'page',
    };
    const result =
      data.id > 0
        ? await patchData(`${ServiceUrl.ENDPOINT_PAGE}`, data)
        : await postData(`${ServiceUrl.ENDPOINT_PAGE}`, data);
    setIsProcessing(false);
    setIsSaved(result);
    return result;
  }, [formValues, patchData, postData, setIsProcessing, setIsSaved]);

  const handleSave = useCallback(async () => {
    const ret = await submitForm();
    return ret;
  }, [submitForm]);

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
      isLoading,
      error,
      isSaved,
      getFieldErrors,
      getStandardTextInputAttributes,
      hasError,
      setAllValues,
      setFieldValue,
      handleAction,
      handleClear,
      handleChange,
      handleReset,
      handleSave,
      fetchItem,
      validateForm,
    }),
    [
      formValues,
      isProcessing,
      isLoading,
      error,
      isSaved,
      getFieldErrors,
      getStandardTextInputAttributes,
      hasError,
      setAllValues,
      setFieldValue,
      handleAction,
      handleClear,
      handleChange,
      handleReset,
      handleSave,
      fetchItem,
      validateForm,
    ],
  );
};

export default usePageEdit;
