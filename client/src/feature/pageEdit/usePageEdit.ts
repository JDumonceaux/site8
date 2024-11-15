import { useCallback, useEffect, useMemo } from 'react';

import { REQUIRED_FIELD, ServiceUrl } from 'lib/utils/constants';
import { combineParent, splitParent } from 'lib/utils/helpers';
import { safeParse } from 'lib/utils/zodHelper';
import type { Page } from 'types/Page';
import { z } from 'zod';

import { useAxios } from '../../hooks/Axios/useAxios';
import { useForm } from '../../hooks/useForm';

// Define Zod Shape
const pageSchema = z
  .object({
    id: z.number(),
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
        required_error: 'Name is required.',
      })
      .min(1, REQUIRED_FIELD)
      .max(500, 'Name max length exceeded: 500')
      .trim(),

    parent: z.string().min(1, REQUIRED_FIELD),
    readability_score: z.string().trim().optional(),
    reading_time: z.string().trim().optional(),
    text: z.string().trim(),
    to: z.string().trim().optional(),
    url: z.string().trim().optional(),
  })
  .refine(
    (data) => data.to ?? data.url,
    'Either to or url should be filled in.',
  );

// Create a type from the schema
type FormType = z.infer<typeof pageSchema>;
type FormKeys = keyof FormType;

const usePageEdit = (data?: null | Page) => {
  // Use Axios to fetch data
  const { patchData, postData } = useAxios<Page>();

  // Return default form values
  const initialFormValues: FormType = useMemo(
    () => ({
      id: 0,
      name: '',
      parent: '',
      readability_score: '',
      reading_time: '',
      text: '',
      to: '',
      url: '',
    }),
    [],
  );

  // Create a form
  const {
    formValues,
    getFieldErrors,
    getFieldValue,
    handleChange,
    hasError,
    isSaved,
    setErrors,
    setFieldValue,
    setFormValues,
    setIsProcessing,
    setIsSaved,
  } = useForm<FormType>(initialFormValues);

  // Map page to form type
  const mapPageToFormType = useCallback(
    (item: null | Page | undefined): FormType | null => {
      if (item) {
        const returnValue = {
          id: item.id,
          name: item.name,
          parent: combineParent(item.parentItems),
          readability_score: item.readability_score ?? '',
          reading_time: item.reading_time ?? '',
          text: item.text ?? '',
          to: item.to ?? '',
          url: item.url ?? '',
        };
        return returnValue;
      }
      return null;
    },
    [],
  );

  // Update the form values when the data changes
  useEffect(() => {
    setFormValues(mapPageToFormType(data) ?? initialFormValues);
  }, [data, initialFormValues, mapPageToFormType, setFormValues]);

  // Validate form
  const validateForm = useCallback(() => {
    const result = safeParse<FormType>(pageSchema, formValues);
    setErrors(result.error?.issues);
    return result.success;
  }, [formValues, setErrors]);

  // Handle save
  const submitForm = useCallback(async () => {
    setIsProcessing(true);
    const { id, parent, ...rest } = formValues;
    const updateItem: Page = {
      ...rest,
      id,
      parentItems: splitParent(parent),
      type: 'page',
    };
    const result =
      updateItem.id > 0
        ? await patchData(ServiceUrl.ENDPOINT_PAGE, updateItem)
        : await postData(ServiceUrl.ENDPOINT_PAGE, updateItem);
    setIsProcessing(false);
    setIsSaved(result);
    return result;
  }, [formValues, patchData, postData, setIsProcessing, setIsSaved]);

  const handleSave = useCallback(async () => {
    if (validateForm()) {
      const returnValue = await submitForm();
      return returnValue;
    }
    return false;
  }, [submitForm, validateForm]);

  const getDefaultProps = (fieldName: FormKeys) => ({
    id: fieldName as string,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setFieldValue(fieldName, e.target.value);
    },
    value: getFieldValue(fieldName),
  });

  return {
    formValues,
    getDefaultProps,
    getFieldErrors,
    handleChange,
    handleSave,
    hasError,
    isSaved,
    setFieldValue,
  };
};

export default usePageEdit;
