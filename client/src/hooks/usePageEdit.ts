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
    .max(100, 'Max length exceeded: 100')
    .trim(),
  long_title: z
    .string({
      invalid_type_error: 'Title must be a string',
    })
    .max(250)
    .trim()
    .optional(),
  to: z.string().trim().optional(),
  url: z.string().trim().optional(),
  create_date: z.string().optional(),
  edit_date: z.string().optional(),
  // parentId: z.coerce.number().optional(),
  parent: z.string().optional(),
  reading_time: z.string().trim().optional(),
  readability_score: z.string().trim().optional(),
  text: z.string().trim(),
});

const usePageEdit = (id: string | undefined) => {
  type FormValues = z.infer<typeof pageSchema>;
  type keys = keyof FormValues;
  // Return default form values
  const defaultFormValues: FormValues = useMemo(
    () => ({
      id: 0,
      name: '',
      to: '',
      url: '',
      text: '',
      long_title: '',
      edit_date: format(new Date(), DF_LONG),
      create_date: format(new Date(), DF_LONG),
      parent: '',
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

  const combineParent = useCallback(
    (item: { id?: number; seq?: number }[] | undefined): string | undefined => {
      if (!item) {
        return '';
      }
      const ret = item
        .flatMap((x) => [x.id?.toString(), x.seq?.toString()])
        .filter(Boolean);
      return ret.join(',');
    },
    [],
  );

  const updateFormValues = useCallback(
    (items: Page | undefined | null) => {
      if (items) {
        const item: FormValues = {
          id: items.id,
          name: items.name ?? '',
          to: items.to ?? '',
          url: items.url ?? '',
          text: items.text ?? '',
          long_title: items.long_title ?? '',
          edit_date:
            (items.edit_date && format(items.edit_date, DF_LONG)) ??
            format(new Date(), DF_LONG),
          create_date:
            (items.create_date && format(items.create_date, DF_LONG)) ??
            format(new Date(), DF_LONG),

          parent: combineParent(items.parent),
          reading_time: items.reading_time ?? '',
          readability_score: items.readability_score ?? '',
        };
        setResetFormValues(item);
        setFormValues(item);
      }
    },
    [combineParent, setFormValues],
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

      if (name === 'name' && value.length > 0 && formValues.to?.length === 0) {
        const x = value.toLowerCase().replaceAll(' ', '-');
        setFormValues((prev) => ({
          ...prev,
          to: x,
        }));
      }
      setIsSaved(false);
    },
    [formValues.to?.length, setFormValues],
  );

  const splitParent = useCallback(
    (value: string | undefined): { id: number; seq: number }[] | undefined => {
      if (!value) {
        return undefined;
      }
      const x = value.trim().length > 0 ? value.trim().split(',') : undefined;
      if (!x) {
        return undefined;
      }
      return x
        .map((item, index) => {
          if (index % 2 === 0) {
            const id = parseInt(item);
            const seq = parseInt(x[index + 1]);
            if (!isNaN(id) && !isNaN(seq)) {
              return { id, seq };
            }
          }
          return undefined;
        })
        .filter(Boolean) as { id: number; seq: number }[];
    },
    [],
  );

  const saveItem = useCallback(
    async (items: FormValues) => {
      const { id, create_date, edit_date, parent, ...rest } = items;
      const data =
        id > 0
          ? {
              ...rest,
              id,
              parent: splitParent(parent),
              edit_date: getDateTime(edit_date) ?? new Date(),
            }
          : {
              ...rest,
              id,
              parent: splitParent(parent),
              edit_date: getDateTime(edit_date) ?? new Date(),
              create_date: getDateTime(create_date) ?? new Date(),
            };
      if (data.id > 0) {
        await patchData(`${ServiceUrl.ENDPOINT_PAGE}`, data);
      } else {
        await postData(`${ServiceUrl.ENDPOINT_PAGE}`, data);
      }
      return true;
    },
    [patchData, postData, splitParent],
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
