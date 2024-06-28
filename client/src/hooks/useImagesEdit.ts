import { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'types/Image';
import { DF_LONG, ServiceUrl } from 'utils';
import { safeParse } from 'utils/zodHelper';
import { z } from 'zod';

import { format } from 'date-fns';
import { Images } from 'types';
import { useAxios } from './Axios/useAxios';
import { useForm } from './useForm';

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

const useImagesEdit = () => {
  // Use Axios to fetch data
  const { data, isLoading, error, fetchData } = useAxios<Images>();
  // Create a type from the schema
  type FormType = z.infer<typeof pageSchema>;

  // Does the data need to be saved?
  const [isSaved, setIsSaved] = useState<boolean>(true);
  // Is the form saving?
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  // Return default form values
  const defaultFormValues: FormType = useMemo(
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
  const {
    formValues,
    setFormValues,
    getDefaultFields,
    setErrors,
    handleChange,
  } = useForm<FormType>(defaultFormValues);

  // Update the form values from the data
  const updateFormValues = useCallback(
    (items: Image | undefined | null) => {
      if (items) {
        const item: FormType = {
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

  // Fetch data when currentId changes
  useEffect(() => {
    fetchData(ServiceUrl.ENDPOINT_IMAGES_NEW);
  }, [fetchData]);

  // Update the form values when the data changes
  useEffect(() => {
    //updateFormValues(data);
  }, [data, updateFormValues]);

  // Validate  form
  const validateForm = useCallback(() => {
    const result = safeParse<FormType>(pageSchema, formValues);
    setErrors(result.error?.issues);
    return result.success;
  }, [formValues, setErrors]);

  // Handle clear form
  const handleClear = useCallback(() => {
    setFormValues(defaultFormValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(undefined);
  }, [defaultFormValues, setErrors, setFormValues]);

  // Handle save
  const saveItem = useCallback(async (items: FormType) => {
    //const { id, create_date, edit_date, tags, ...rest } = items;
    // const data: Image = {
    //   ...rest,
    //   id,
    //   tags: tags?.split(',') ?? [],
    //   edit_date: getDateTime(edit_date) ?? new Date(),
    //   create_date:
    //     id == 0 ? getDateTime(create_date) ?? new Date() : new Date(),
    // };

    //        await patchData(`${ServiceUrl.ENDPOINT_IMAGE}/${data.id}`);

    return true;
  }, []);

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

  return useMemo(
    () => ({
      isProcessing,
      isLoading,
      error,
      isSaved,
      handleClear,
      handleChange,
      getDefaultFields,
      submitForm,
    }),
    [
      isProcessing,
      handleClear,
      handleChange,
      submitForm,
      isLoading,
      error,
      isSaved,
      getDefaultFields,
    ],
  );
};

export default useImagesEdit;
