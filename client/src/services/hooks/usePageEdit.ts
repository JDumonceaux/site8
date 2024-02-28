import { useCallback, useEffect, useMemo, useState } from 'react';
import { Page } from 'services/models/Page';
import { DF_LONG, REQUIRED_FIELD, ServiceUrl } from 'utils';
import { z } from 'zod';
import { safeParse } from 'utils/zodHelper';
import useSnackbar from './useSnackbar';
import { useAxiosHelper } from './useAxiosHelper';
import { format } from 'date-fns';

// Define Zod Shape
const pageSchema = z.object({
  id: z.number(),
  short_title: z
    .string({
      required_error: 'Short Title is required.',
      invalid_type_error: 'Title must be a string',
    })
    .min(1, REQUIRED_FIELD)
    .max(30, 'Max length exceeded: 30')
    .trim(),
  long_title: z
    .string({
      required_error: 'Long Title is required.',
      invalid_type_error: 'Title must be a string',
    })
    .min(1, REQUIRED_FIELD)
    .max(250)
    .trim(),
  edit_date: z.coerce.date().optional(),
  edit_date_display: z.string().optional(),
  resources: z.boolean(),
  parent: z.string().trim().optional(),
  reading_time: z.string().trim().optional(),
  readability_score: z.string().trim().optional(),
  text: z
    .string({ required_error: 'Text is required.' })
    .min(1, REQUIRED_FIELD)
    .trim(),
});

const usePageEdit = () => {
  type PageFormValues = z.infer<typeof pageSchema>;
  type keys = keyof PageFormValues;
  // Return default form values
  const defaultFormValues: PageFormValues = useMemo(
    () => ({
      id: 0,
      short_title: '',
      long_title: '',
      edit_date_display: format(new Date(), DF_LONG),
      resources: false,
      text: '',
      parent: '',
      reading_time: '',
      readability_score: '',
    }),
    [],
  );

  const [formValues, setFormValues] =
    useState<PageFormValues>(defaultFormValues);
  const [resetFormValues, setResetFormValues] = useState<
    PageFormValues | undefined
  >(undefined);
  // const [showErrorOverlay, setShowErrorOverlay] = useState<boolean>(false);
  // const [updateError, setUpdateError] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { setSimpleSnackbarMessage } = useSnackbar();

  const { data, fetchData, patchData, postData } = useAxiosHelper<Page>();

  const [errors, setErrors] =
    useState<z.ZodFormattedError<PageFormValues> | null>(null);

  useEffect(() => {
    if (formValues.id && formValues.id > 0) {
      fetchData(`${ServiceUrl.ENDPOINT_PAGE}/${formValues.id}`);
    }
  });

  useEffect(() => {
    if (data) {
      const item: PageFormValues = {
        id: data.id,
        short_title: data.short_title ?? '',
        long_title: data.long_title ?? '',
        edit_date_display:
          (data.edit_date && format(data.edit_date, DF_LONG)) ??
          format(new Date(), DF_LONG),
        resources: data.resources ?? false,
        text: data.text ?? '',
        parent: data.parent ?? '',
        reading_time: data.reading_time ?? '',
        readability_score: data.readability_score ?? '',
      };
      setResetFormValues(item);
      setFormValues(item);
    }
  }, [data]);

  const validateForm = useCallback(() => {
    const result = safeParse<PageFormValues>(pageSchema, formValues);
    setErrors(result.errorFormatted);

    return result.success;
  }, [formValues]);

  const handleCancel = useCallback(() => {
    setFormValues(defaultFormValues);
  }, [defaultFormValues]);

  const handleReset = useCallback(() => {
    setFormValues(resetFormValues ?? defaultFormValues);
  }, [defaultFormValues, resetFormValues]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      // Handle form submission here
      setIsProcessing(true);
      console.log('p2');
      if (validateForm()) {
        console.log('p3');
        if (formValues.id > 0) {
          console.log('p4');
          patchData(`${ServiceUrl.ENDPOINT_PAGE}`, formValues);
        } else {
          console.log('p5');
          postData(`${ServiceUrl.ENDPOINT_PAGE}`, formValues);
        }
        console.log('p6');
        setIsProcessing(false);
      } else {
        alert('Form is not valid');
      }
      setSimpleSnackbarMessage('Saved');
    },
    [formValues, patchData, postData, setSimpleSnackbarMessage, validateForm],
  );

  const setFieldValue = useCallback(
    (fieldName: keys, value: string | boolean | number | undefined) => {
      setFormValues((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    },
    [],
  );

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

  const isValid = useCallback(
    (fieldName: keys) => {
      return getFieldErrors(fieldName) ? false : true;
    },
    [getFieldErrors],
  );

  return useMemo(
    () => ({
      pageSchema,
      formValues,
      isProcessing,
      getFieldErrors,
      isValid,
      setFormValues,
      setFieldValue,
      setId,
      handleCancel,
      handleClear: handleCancel,
      handleChange,
      handleSubmit,
      handleReset,
    }),
    [
      formValues,
      isProcessing,
      getFieldErrors,
      isValid,
      setFieldValue,
      setId,
      handleCancel,
      handleSubmit,
      handleReset,
    ],
  );
};

export default usePageEdit;
