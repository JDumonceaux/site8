import { useCallback, useEffect, useMemo } from 'react';
import { Page } from 'types/Page';
import { REQUIRED_FIELD, ServiceUrl } from 'utils/constants';
import { combineParent, splitParent } from 'utils/helpers';
import { safeParse } from 'utils/zodHelper';
import { z } from 'zod';
import { useAxios } from './Axios/useAxios';
import { useForm } from './useForm';

// Define Zod Shape
const pageSchema = z
  .object({
    id: z.number(),
    name: z
      .string({
        required_error: 'Name is required.',
        invalid_type_error: 'Name must be a string',
      })
      .min(1, REQUIRED_FIELD)
      .max(500, 'Name max length exceeded: 500')
      .trim(),

    to: z.string().trim().optional(),
    url: z.string().trim().optional(),
    parent: z.string().min(1, REQUIRED_FIELD),
    reading_time: z.string().trim().optional(),
    readability_score: z.string().trim().optional(),
    text: z.string().trim(),
  })
  .refine(
    (data) => data.to ?? data.url,
    'Either to or url should be filled in.',
  );

// Create a type from the schema
type FormType = z.infer<typeof pageSchema>;
type keys = keyof FormType;

const usePageEdit = (data?: Page) => {
  // Use Axios to fetch data
  const { patchData, postData } = useAxios<Page>();

  // Return default form values
  const initialFormValues: FormType = useMemo(
    () => ({
      id: 0,
      name: '',
      to: '',
      url: '',
      text: '',
      parent: '',
      reading_time: '',
      readability_score: '',
    }),
    [],
  );

  // Create a form
  const {
    hasError,
    formValues,
    isSaved,
    handleChange,
    setFieldValue,
    setErrors,
    setIsSaved,
    setIsProcessing,
    getFieldErrors,
    setFormValues,
  } = useForm<FormType>(initialFormValues);

  // Map page to form type
  const mapPageToFormType = useCallback(
    (item: Page | undefined | null): FormType | undefined => {
      if (item) {
        const ret = {
          id: item.id,
          name: item.name ?? '',
          to: item.to ?? '',
          url: item.url ?? '',
          text: item.text ?? '',
          parent: combineParent(item.parentItems),
          reading_time: item.reading_time ?? '',
          readability_score: item.readability_score ?? '',
        };
        return ret;
      }
      return undefined;
    },
    [],
  );

  // Update the form values when the data changes
  useEffect(() => {
    if (data) {
      setFormValues(mapPageToFormType(data) ?? initialFormValues);
    }
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
    const data: Page = {
      ...rest,
      id,
      parentItems: splitParent(parent),
      type: 'page',
    };
    const result =
      data.id > 0
        ? await patchData(`${ServiceUrl.ENDPOINT_PAGE}`, data)
        : await postData(`${ServiceUrl.ENDPOINT_PAGE}`, data);
    setIsProcessing(false);
    setIsSaved(result);
    return result;
  }, [formValues, patchData, postData, setIsProcessing, setIsSaved]);

  const handleSave = useCallback(async () => {
    if (validateForm()) {
      const ret = await submitForm();
      return ret;
    }
    return false;
  }, [submitForm, validateForm]);

  const getStandardTextInputAttributes = useCallback(
    (fieldName: keys) => {
      return {
        id: fieldName,
        errorText: getFieldErrors(fieldName),
        hasError: hasError(fieldName),
        value: formValues[fieldName],
        onChange: handleChange,
      };
    },
    [getFieldErrors, hasError, formValues, handleChange],
  );

  return useMemo(
    () => ({
      formValues,
      getFieldErrors,
      getStandardTextInputAttributes,
      hasError,
      handleChange,
      handleSave,
      setFieldValue,
      isSaved,
    }),
    [
      formValues,
      getFieldErrors,
      getStandardTextInputAttributes,
      hasError,
      setFieldValue,
      handleChange,
      handleSave,
      isSaved,
    ],
  );
};

export default usePageEdit;
