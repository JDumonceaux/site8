import { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'types/Image';
import { ServiceUrl } from 'utils/constants';
import { getSRC } from 'utils/helpers';
import { safeParse } from 'utils/zodHelper';
import { z } from 'zod';
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
});

const useImageEdit = (id: string | undefined) => {
  // Use Axios to fetch data
  const { data, isLoading, error, fetchData, patchData, postData } =
    useAxios<Image>();
  // Create a type from the schema
  type FormValues = z.infer<typeof pageSchema>;

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
      folder: '',
      official_url: '',
      description: '',
      location: '',
      tags: '',
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
  } = useForm<FormValues>(defaultFormValues);
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
          folder: items.folder ?? '',
          official_url: items.official_url ?? '',
          description: items.description ?? '',
          location: items.location ?? '',
          tags: items.tags?.toString() ?? '',
          src: getSRC(items.folder, items.fileName),
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
  const handleClear = useCallback(() => {
    setFormValues(defaultFormValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(undefined);
  }, [defaultFormValues, setErrors, setFormValues]);

  // Handle form reset
  const handleReset = useCallback(() => {
    updateFormValues(originalValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(undefined);
  }, [originalValues, setErrors, updateFormValues]);

  // Handle save
  const saveItem = useCallback(
    async (items: FormValues) => {
      const { id, tags, ...rest } = items;
      const data: Image = {
        ...rest,
        id,
        tags: tags?.split(',') ?? [],
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

  const handleChangeImage = useCallback(
    (item: Image | undefined) => {
      setFormValues((prev) => ({
        ...prev,
        fileName: item?.fileName ?? '',
        folder: item?.folder ?? '',
      }));

      setIsSaved(false);
    },
    [setFormValues],
  );

  return useMemo(
    () => ({
      formValues,
      isProcessing,
      isLoading,
      error,
      isSaved,
      handleChange,
      handleClear,
      handleReset,
      getDefaultFields,
      submitForm,
      handleChangeImage,
    }),
    [
      formValues,
      isProcessing,
      handleClear,
      handleChange,
      submitForm,
      handleReset,
      isLoading,
      error,
      isSaved,
      handleChangeImage,
      getDefaultFields,
    ],
  );
};

export default useImageEdit;
