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
      required_error: 'Name is required.',
      invalid_type_error: 'Name must be a string',
    })
    .max(100, 'Name max length exceeded: 100')
    .trim()
    .optional(),
  location: z
    .string({
      invalid_type_error: 'Location must be a string',
    })
    .max(250, 'Location max length exceeded: 500')
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
  // Use Axios to fetch data
  const { data, isLoading, error, fetchData, patchData, postData } =
    useAxios<Image>();
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
      fileName: '',
      src: '',
      folder: '',
      official_url: '',
      description: '',
      location: '',
      tags: '',
      edit_date: format(new Date(), DF_LONG),
      create_date: format(new Date(), DF_LONG),
    }),
    [],
  );
  // Create a form
  const { formValues, setFormValues, setFieldValue, errors, setErrors } =
    useForm<FormValues>(defaultFormValues);
  // Keep a copy of the form values to reset
  const [originalValues, setOriginalValues] = useState<Image | undefined>(
    undefined,
  );
  // Update the form values from the data
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
        setFormValues(item);
      }
    },
    [setFormValues],
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
      fetchData(`${ServiceUrl.ENDPOINT_IMAGE}/${currentId}`);
    }
  }, [currentId]);

  // Fetch data when currentAction changes
  useEffect(() => {
    if (currentAction) {
      fetchData(`${ServiceUrl.ENDPOINT_IMAGE}/${currentId}/${currentAction}`);
    }
  }, [currentAction]);

  // Update the form values when the data changes
  useEffect(() => {
    updateFormValues(data);
    setOriginalValues(data);
  }, [data, updateFormValues]);

  // Validate  form
  const validateForm = useCallback(() => {
    const result = safeParse<FormValues>(pageSchema, formValues);
    setErrors(result.errorFormatted);
    return result.success;
  }, [formValues, setErrors]);

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

  // Handle save
  const saveItem = useCallback(
    async (items: FormValues) => {
      const { id, create_date, edit_date, tags, ...rest } = items;
      const data: Image = {
        ...rest,
        id,
        tags: tags?.split(',') ?? [],
        edit_date: getDateTime(edit_date) ?? new Date(),
        create_date:
          id == 0 ? getDateTime(create_date) ?? new Date() : new Date(),
      };
      if (data.id > 0) {
        await patchData(`${ServiceUrl.ENDPOINT_IMAGE}/${data.id}`, data);
      } else {
        await postData(`${ServiceUrl.ENDPOINT_IMAGE}`, data);
      }
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
      handleClear,
      handleChange,
      handleReset,
      submitForm,
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
      handleClear,
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
