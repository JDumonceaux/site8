import { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'services/types/Image';
import { DF_LONG, ServiceUrl } from 'utils';
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
    .max(100, 'Max length exceeded: 100')
    .trim()
    .optional(),
  location: z
    .string({
      invalid_type_error: 'Location must be a string',
    })
    .max(250)
    .trim()
    .optional(),
  fileName: z.string().trim(),
  src: z.string().trim().optional(),
  folder: z.string().trim().optional(),
  official_url: z.string().trim().optional(),
  tags: z.string().trim().optional(),
  description: z.string().trim().optional(),
  create_date: z.string().optional(),
  edit_date: z.string().optional(),
});

const useImageEdit = (id: string | undefined) => {
  type FormValues = z.infer<typeof pageSchema>;
  type keys = keyof FormValues;
  // Return default form values
  const defaultFormValues: FormValues = useMemo(
    () => ({
      id: 0,
      name: '',
      location: '',
      fileName: '',
      src: '',
      folder: '',
      official_url: '',
      tags: '',
      description: '',
      edit_date: format(new Date(), DF_LONG),
      create_date: format(new Date(), DF_LONG),
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
    useAxios<Image>();

  const updateFormValues = useCallback(
    (items: Image | undefined | null) => {
      if (items) {
        const item: FormValues = {
          id: items.id,
          name: items.name ?? '',
          fileName: items.fileName ?? '',
          src: items.src ?? '',
          folder: items.folder ?? '',
          official_url: items.official_url ?? '',
          description: items.description ?? '',
          location: items.location ?? '',
          tags: items.tags?.toString() ?? '',
          edit_date:
            (items.edit_date && format(items.edit_date, DF_LONG)) ??
            format(new Date(), DF_LONG),
          create_date:
            (items.create_date && format(items.create_date, DF_LONG)) ??
            format(new Date(), DF_LONG),
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
      fetchData(`${ServiceUrl.ENDPOINT_IMAGES}/${tempId}`);
    }
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
      const { id, create_date, edit_date, tags, ...rest } = items;
      const data =
        id > 0
          ? {
              ...rest,
              id,
              tags: tags?.split(',') ?? [],
              edit_date: getDateTime(edit_date) ?? new Date(),
            }
          : {
              ...rest,
              id,
              tags: tags?.split(',') ?? [],
              edit_date: getDateTime(edit_date) ?? new Date(),
              create_date: getDateTime(create_date) ?? new Date(),
            };
      if (data.id > 0) {
        await patchData(`${ServiceUrl.ENDPOINT_IMAGE}`, data);
      } else {
        await postData(`${ServiceUrl.ENDPOINT_IMAGE}`, data);
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

  const handleChangeImage = useCallback(
    (item: Image | undefined) => {
      setFormValues((prev) => ({
        ...prev,
        fileName: item?.fileName ?? '',
        src: item?.src ?? '',
        folder: item?.folder ?? '',
      }));

      setIsSaved(false);
    },
    [setFormValues],
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

      handleChangeImage,
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
      handleChangeImage,
    ],
  );
};

export default useImageEdit;
