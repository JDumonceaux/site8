import { useCallback, useEffect, useMemo } from 'react';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ServiceUrl } from 'lib/utils/constants';
import { combineParent, splitParent } from 'lib/utils/helpers';
import { getDefaultObject } from 'lib/utils/objectUtil';
import { safeParse } from 'lib/utils/zodHelper';
import type { Page, PageEdit } from 'types/Page';

import useForm from '../../hooks/useForm';

type FormKeys = keyof PageEdit;

const patchData = async (updateItem: Page) => {
  const response = await axios.patch(ServiceUrl.ENDPOINT_PAGE, updateItem);
  return await response.data;
};

// const postData = async (data: Page) => {
//   const response = await axios.post(ServiceUrl.ENDPOINT_PAGE, data);
//   return response.data;
// };

const usePageEdit = (data?: null | Page) => {
  // Use Axios to fetch data
  //const { patchData, putData } = useAxios<Page>();
  const { mutate } = useMutation({
    mutationFn: patchData,
  });

  // Return default form values
  const initialFormValues: PageEdit = getDefaultObject<PageEdit>();

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
  } = useForm<FormType>(initialFormValues);

  // Handle save
  const handleSubmit = useCallback(async () => {
    const { id, parent, ...rest } = formValues;
    const updateItem: Page = {
      ...rest,
      id,
      parentItems: splitParent(parent),
      type: 'page',
    };
    // eslint-disable-next-line promise/avoid-new
    await new Promise((resolve) => {
      mutate(updateItem, { onSuccess: resolve });
    });
  }, [formValues, mutate]);

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

  const handleSave = useCallback(async () => {
    if (validateForm()) {
      await handleSubmit();
    }
    return false;
  }, [handleSubmit, validateForm]);

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
