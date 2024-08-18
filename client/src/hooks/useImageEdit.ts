import { ServiceUrl } from 'lib/utils/constants';
import { getSRC } from 'lib/utils/helpers';
import { safeParse } from 'lib/utils/zodHelper';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'types/Image';
import { z } from 'zod';

import { useAxios } from './Axios/useAxios';
import { useForm } from './useForm';

// Define Zod Shape
const pageSchema = z.object({
  description: z.string().trim().optional(),
  fileName: z.string().trim(),
  folder: z.string().trim().optional(),
  id: z.number(),
  location: z
    .string({
      invalid_type_error: 'Location must be a string',
    })
    .max(250, 'Location max length exceeded: 500')
    .trim()
    .optional(),
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
      required_error: 'Name is required.',
    })
    .max(100, 'Name max length exceeded: 100')
    .trim()
    .optional(),
  official_url: z.string().trim().optional(),
  src: z.string().trim().optional(),
  tags: z.string().trim().optional(),
});

const useImageEdit = (id: string | undefined) => {
  // Use Axios to fetch data
  const { data, error, fetchData, isLoading, patchData, postData } =
    useAxios<Image>();
  // Create a type from the schema
  type FormValues = z.infer<typeof pageSchema>;

  // Current Item
  const [currentId, setCurrentId] = useState<number>(0);
  // Current Action
  const [currentAction, setCurrentAction] = useState<string | undefined>();
  // Does the data need to be saved?
  const [isSaved, setIsSaved] = useState<boolean>(true);
  // Is the form saving?
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  // Return default form values
  const defaultFormValues: FormValues = useMemo(
    () => ({
      description: '',
      fileName: '',
      folder: '',
      id: 0,
      location: '',
      name: '',
      official_url: '',
      tags: '',
    }),
    [],
  );
  // Create a form
  const {
    formValues,
    getDefaultFields,
    handleChange,
    setErrors,
    setFormValues,
  } = useForm<FormValues>(defaultFormValues);
  // Keep a copy of the form values to reset
  const [originalValues, setOriginalValues] = useState<Image | undefined>();
  // Update the form values from the data
  const updateFormValues = useCallback(
    (items: Image | null | undefined) => {
      if (items) {
        const item: FormValues = {
          description: items.description ?? '',
          fileName: items.fileName ?? '',
          folder: items.folder ?? '',
          id: items.id,
          location: items.location ?? '',
          name: items.name ?? '',
          official_url: items.official_url ?? '',
          src: getSRC(items.folder, items.fileName),
          tags: items.tags?.toString() ?? '',
        };
        setFormValues(item);
      }
    },
    [setFormValues],
  );

  // Get the data if the params change
  useEffect(() => {
    if (id) {
      const temporaryId = Number.parseInt(id ?? '');
      if (!isNaN(temporaryId) && temporaryId > 0) {
        setCurrentId(temporaryId);
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
  }, [currentId, fetchData]);

  // Fetch data when currentAction changes
  useEffect(() => {
    if (currentAction) {
      fetchData(`${ServiceUrl.ENDPOINT_IMAGE}/${currentId}/${currentAction}`);
    }
  }, [currentAction, currentId, fetchData]);

  // Update the form values when the data changes
  useEffect(() => {
    updateFormValues(data);
    setOriginalValues(data);
  }, [data, updateFormValues]);

  // Validate  form
  const validateForm = useCallback(() => {
    const result = safeParse<FormValues>(pageSchema, formValues);
    setErrors(result.error?.issues);
    return result.success;
  }, [formValues, setErrors]);

  // Handle clear form
  const handleClear = () => {
    setFormValues(defaultFormValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(undefined);
  };

  // Handle form reset
  const handleReset = () => {
    updateFormValues(originalValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(undefined);
  };

  // Handle save
  const saveItem = useCallback(
    async (items: FormValues) => {
      const { id, tags, ...rest } = items;
      const data: Image = {
        ...rest,
        id,
        tags: tags?.split(',') ?? [],
      };
      await (data.id > 0
        ? patchData(`${ServiceUrl.ENDPOINT_IMAGE}/${data.id}`, data)
        : postData(`${ServiceUrl.ENDPOINT_IMAGE}`, data));
      return true;
    },
    [patchData, postData],
  );

  // Handle form submission
  const submitForm = (): boolean => {
    setIsProcessing(true);
    if (validateForm()) {
      saveItem(formValues);
      setIsProcessing(false);
      setIsSaved(true);
      return true;
    }
    return false;
  };

  const handleChangeImage = (item: Image | undefined) => {
    setFormValues((previous) => ({
      ...previous,
      fileName: item?.fileName ?? '',
      folder: item?.folder ?? '',
    }));

    setIsSaved(false);
  };

  return {
    error,
    formValues,
    getDefaultFields,
    handleChange,
    handleChangeImage,
    handleClear,
    handleReset,
    isLoading,
    isProcessing,
    isSaved,
    submitForm,
  };
};

export default useImageEdit;
