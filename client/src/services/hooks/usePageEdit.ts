import { useCallback, useEffect, useMemo, useState } from 'react';
import { Page } from 'services/types/Page';
import { DF_LONG, REQUIRED_FIELD, ServiceUrl } from 'utils';
import { z } from 'zod';
import { safeParse } from 'utils/zodHelper';

import { useAxiosHelper } from './useAxiosHelper';
import { format } from 'date-fns';
import { useForm } from './useForm';

// Define Zod Shape
const pageSchema = z.object({
  id: z.number(),
  name: z
    .string({
      required_error: 'Short Title is required.',
      invalid_type_error: 'Title must be a string',
    })
    .min(1, REQUIRED_FIELD)
    .max(30, 'Max length exceeded: 30')
    .trim(),
  long_title: z
    .string({
      invalid_type_error: 'Title must be a string',
    })
    .max(250)
    .trim()
    .optional(),
  url: z
    .string({
      required_error: 'URL is required.',
      invalid_type_error: 'URL must be a string',
    })
    .min(1, REQUIRED_FIELD)
    .max(30, 'Max length exceeded: 30')
    .trim(),
  edit_date: z.coerce.date().optional(),
  edit_date_display: z.string().optional(),
  resources: z.boolean(),
  parentId: z.coerce.number().optional(),
  reading_time: z.string().trim().optional(),
  readability_score: z.string().trim().optional(),
  text: z
    .string({ required_error: 'Text is required.' })
    .min(1, REQUIRED_FIELD)
    .trim(),
});

const usePageEdit = (id: string | undefined) => {
  type FormValues = z.infer<typeof pageSchema>;
  type keys = keyof FormValues;
  // Return default form values
  const defaultFormValues: FormValues = useMemo(
    () => ({
      id: 0,
      name: '',
      url: '',
      long_title: '',
      edit_date_display: format(new Date(), DF_LONG),
      resources: false,
      text: '',
      parentId: 0,
      reading_time: '',
      readability_score: '',
    }),
    [],
  );

  const { formValues, setFormValues, setFieldValue, errors, setErrors } =
    useForm<FormValues>(defaultFormValues);

  const [resetFormValues, setResetFormValues] = useState<
    FormValues | undefined
  >(undefined);
  // const [showErrorOverlay, setShowErrorOverlay] = useState<boolean>(false);
  // const [updateError, setUpdateError] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const { data, isLoading, error, fetchData, patchData, postData } =
    useAxiosHelper<Page>();

  useEffect(() => {
    setFormValues(defaultFormValues);
    if (!id) {
      return;
    }
    const tempId = parseInt(id ?? '');
    if (!isNaN(tempId) && tempId > 0) {
      fetchData(`${ServiceUrl.ENDPOINT_PAGE}/${tempId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (data) {
      const item: FormValues = {
        id: data.id,
        name: data.name ?? '',
        long_title: data.long_title ?? '',
        edit_date_display:
          (data.edit_date && format(data.edit_date, DF_LONG)) ??
          format(new Date(), DF_LONG),
        resources: data.resources ?? false,
        text: data.text ?? '',
        parentId: data.parentId ?? 0,
        url: data.url ?? '',
        reading_time: data.reading_time ?? '',
        readability_score: data.readability_score ?? '',
      };
      setResetFormValues(item);
      setFormValues(item);
    }
  }, [data, setFormValues]);

  const validateForm = useCallback(() => {
    const result = safeParse<FormValues>(pageSchema, formValues);
    setErrors(result.errorFormatted);

    return result.success;
  }, [formValues, setErrors]);

  const handleCancel = useCallback(() => {
    setFormValues(defaultFormValues);
  }, [defaultFormValues, setFormValues]);

  const handleReset = useCallback(() => {
    setFormValues(resetFormValues ?? defaultFormValues);
  }, [defaultFormValues, resetFormValues, setFormValues]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setFormValues],
  );

  const submitForm = useCallback((): boolean => {
    // Handle form submission here
    setIsProcessing(true);

    if (validateForm()) {
      if (formValues.id > 0) {
        patchData(`${ServiceUrl.ENDPOINT_PAGE}`, formValues);
      } else {
        postData(`${ServiceUrl.ENDPOINT_PAGE}`, formValues);
      }

      setIsProcessing(false);
      return true;
    }
    return false;
  }, [formValues, patchData, postData, validateForm]);

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
      handleCancel,
      handleClear: handleCancel,
      handleChange,
      submitForm,
      handleReset,
      isLoading,
      error,
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
      handleCancel,
      handleChange,
      submitForm,
      handleReset,
      isLoading,
      error,
    ],
  );
};

export default usePageEdit;
