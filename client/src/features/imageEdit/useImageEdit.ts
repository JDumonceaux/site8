import { useCallback, useEffect, useMemo, useState } from 'react';

import { ServiceUrl } from 'lib/utils/constants';
import { getSRC } from 'lib/utils/helpers';
import { safeParse } from 'lib/utils/zodHelper';
import type { Image } from 'types/Image';
import { z } from 'zod';

import { useAxios } from '../../hooks/Axios/useAxios';
import useForm from '../../hooks/useForm';

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

const useImageEdit = (id: null | string) => {
  // Use Axios to fetch data
  const { data, error, fetchData, isLoading, patchData, putData } =
    useAxios<Image>();
  // Create a type from the schema
  type FormType = z.infer<typeof pageSchema>;
  type FormKeys = keyof FormType;

  const getDefaultProps = (fieldName: FormKeys) => ({
    'data-id': fieldName,
    'data-line': 0,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setFieldValue(fieldName, e.target.value);
    },
    value: getFieldValue(fieldName),
  });

  // Current Item
  const [currentId, setCurrentId] = useState<number>(0);
  // Current Action
  const [currentAction, setCurrentAction] = useState<null | string>();
  // Does the data need to be saved?
  const [isSaved, setIsSaved] = useState<boolean>(true);
  // Is the form saving?
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  // Return default form values
  const defaultFormType: FormType = useMemo(
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
    getFieldValue,
    handleChange,
    setErrors,
    setFieldValue,
    setFormValues,
  } = useForm<FormType>(defaultFormType);

  // Keep a copy of the form values to reset
  const [originalValues, setOriginalValues] = useState<Image | null>();

  // Update the form values from the data
  const updateFormType = useCallback(
    (items: Image | null | undefined) => {
      if (items) {
        const item: FormType = {
          description: items.description ?? '',
          fileName: items.fileName,
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
      const temporaryId = Number.parseInt(id, 10);
      if (!Number.isNaN(temporaryId) && temporaryId > 0) {
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
  }, [currentId]);

  // Fetch data when currentAction changes
  useEffect(() => {
    if (currentAction) {
      fetchData(`${ServiceUrl.ENDPOINT_IMAGE}/${currentId}/${currentAction}`);
    }
  }, [currentAction, currentId]);

  // Update the form values when the data changes
  useEffect(() => {
    updateFormType(data);
    setOriginalValues(data);
  }, [data, updateFormType]);

  // Validate  form
  const validateForm = useCallback(() => {
    const result = safeParse<FormType>(pageSchema, formValues);
    setErrors(result.error?.issues);
    return result.success;
  }, [formValues, setErrors]);

  // Handle clear form
  const handleClear = () => {
    setFormValues(defaultFormType);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(null);
  };

  // Handle form reset
  const handleReset = () => {
    updateFormType(originalValues);
    setIsSaved(true);
    setIsProcessing(false);
    setErrors(null);
  };

  // Handle save
  const saveItem = useCallback(
    async (items: FormType) => {
      // RETHINK THIS
      const updatedItem: Image = {
        ...items,
        tags: items.tags?.split(',') ?? [],
      };

      await (updatedItem.id > 0
        ? patchData(
            `${ServiceUrl.ENDPOINT_IMAGE}/${updatedItem.id}`,
            updatedItem,
          )
        : putData(ServiceUrl.ENDPOINT_IMAGE, updatedItem));
      return true;
    },
    [patchData, putData],
  );

  // Handle form submission
  const submitForm = async (): Promise<boolean> => {
    setIsProcessing(true);
    if (validateForm()) {
      await saveItem(formValues);
      setIsProcessing(false);
      setIsSaved(true);
      return true;
    }
    return false;
  };

  const handleChangeImage = (item: Image | null | undefined) => {
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
    getDefaultProps,
    getFieldValue,
    handleChange,
    handleChangeImage,
    handleClear,
    handleReset,
    isLoading,
    isProcessing,
    isSaved,
    setFieldValue,
    submitForm,
  };
};

export default useImageEdit;
