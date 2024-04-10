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
  create_date: z.string().optional(),
  edit_date: z.string().optional(),
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
      edit_date: format(new Date(), DF_LONG),
      create_date: format(new Date(), DF_LONG),
      resources: false,
      text: '',
      parentId: 0,
      reading_time: '',
      readability_score: '',
    }),
    [],
  );

  const [isSaved, setIsSaved] = useState<boolean>(true);

  const { formValues, setFormValues, setFieldValue, errors, setErrors } =
    useForm<FormValues>(defaultFormValues);

  const [resetFormValues, setResetFormValues] = useState<
    FormValues | undefined
  >(undefined);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const { data, isLoading, error, fetchData, patchData, postData } =
    useAxios<Page>();

  const updateFormValues = useCallback(
    (items: Page | undefined | null) => {
      if (items) {
        const item: FormValues = {
          id: items.id,
          name: items.name ?? '',
          long_title: items.long_title ?? '',
          edit_date:
            (items.edit_date && format(items.edit_date, DF_LONG)) ??
            format(new Date(), DF_LONG),
          create_date:
            (items.create_date && format(items.create_date, DF_LONG)) ??
            format(new Date(), DF_LONG),
          resources: items.resources ?? false,
          text: items.text ?? '',
          parentId: items.parentId ?? 0,
          url: items.url ?? '',
          reading_time: items.reading_time ?? '',
          readability_score: items.readability_score ?? '',
        };
        setResetFormValues(item);
        setFormValues(item);
      }
    },
    [setFormValues],
  );

  useEffect(() => {
    setFormValues(defaultFormValues);
    if (!id) {
      return;
    }
  }, [defaultFormValues, id, setFormValues]);

  useEffect(() => {
    const tempId = parseInt(id ?? '');
    if (!isNaN(tempId) && tempId > 0) {
      fetchData(`${ServiceUrl.ENDPOINT_PAGE}/${tempId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    updateFormValues(data);
  }, [data, updateFormValues]);

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
      setIsSaved(false);
    },
    [setFormValues],
  );

  const saveItem = useCallback(
    async (items: FormValues) => {
      const { create_date, edit_date, ...rest } = items;
      const revisedData = {
        ...rest,
        edit_date: getDateTime(edit_date) ?? new Date(),
        create_date: getDateTime(create_date) ?? new Date(),
      };

      if (revisedData.id > 0) {
        await patchData(`${ServiceUrl.ENDPOINT_PAGE}`, revisedData);
      } else {
        await postData(`${ServiceUrl.ENDPOINT_PAGE}`, revisedData);
      }
      return true;
    },
    [patchData, postData],
  );

  const submitForm = useCallback((): boolean => {
    // Handle form submission here
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
      handleCancel,
      handleClear: handleCancel,
      handleChange,
      submitForm,
      handleReset,
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
      handleCancel,
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
