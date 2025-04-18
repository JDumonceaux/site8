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

const usePageEdit = (data?: null | Page) => {
  async function getPageData(id: string) {
    try {
      const response = await axios.get<Page>(
        `${ServiceUrl.ENDPOINT_PAGE}/${id}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function postPageData(data: PageEdit) {
    try {
      await axios.post<PageEdit>(ServiceUrl.ENDPOINT_PAGE, data);
    } catch (error) {
      throw error;
    }
  }

  async function patchPageData(data: PageEdit) {
    try {
      await axios.patch<PageEdit>(ServiceUrl.ENDPOINT_PAGE, data);
    } catch (error) {
      throw error;
    }
  }

  async function deletePageData(id: string) {
    try {
      await axios.delete(`${ServiceUrl.ENDPOINT_PAGE}/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Use Axios to fetch data
  //const { patchData, putData } = useAxios<Page>();

  // Create a form
  // const {
  //   formValues,
  //   getFieldErrors,
  //   getFieldValue,
  //   handleChange,
  //   hasError,
  //   isSaved,
  //   setErrors,
  //   setFieldValue,
  //   setFormValues,
  // } = useForm<FormType>(initialFormValues);

  // // Handle save
  // const handleSubmit = useCallback(async () => {
  //   const { id, parent, ...rest } = formValues;
  //   const updateItem: Page = {
  //     ...rest,
  //     id,
  //     parentItems: splitParent(parent),
  //     type: 'page',
  //   };
  //   // eslint-disable-next-line promise/avoid-new
  //   await new Promise((resolve) => {
  //     mutate(updateItem, { onSuccess: resolve });
  //   });
  // }, [formValues, mutate]);

  // // Map page to form type
  // const mapPageToFormType = useCallback(
  //   (item: null | Page | undefined): FormType | null => {
  //     if (item) {
  //       const returnValue = {
  //         id: item.id,
  //         name: item.name,
  //         parent: combineParent(item.parentItems),
  //         readability_score: item.readability_score ?? '',
  //         reading_time: item.reading_time ?? '',
  //         text: item.text ?? '',
  //         to: item.to ?? '',
  //         url: item.url ?? '',
  //       };
  //       return returnValue;
  //     }
  //     return null;
  //   },
  //   [],
  // );

  // // Update the form values when the data changes
  // useEffect(() => {
  //   setFormValues(mapPageToFormType(data) ?? initialFormValues);
  // }, [data, initialFormValues, mapPageToFormType, setFormValues]);

  // // Validate form
  // const validateForm = useCallback(() => {
  //   const result = safeParse<FormType>(pageSchema, formValues);
  //   setErrors(result.error?.issues);
  //   return result.success;
  // }, [formValues, setErrors]);

  // const handleSave = useCallback(async () => {
  //   if (validateForm()) {
  //     await handleSubmit();
  //   }
  //   return false;
  // }, [handleSubmit, validateForm]);

  // const getDefaultProps = (fieldName: FormKeys) => ({
  //   'data-id': fieldName,
  //   'data-line': 0,
  //   onChange: (
  //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   ) => {
  //     setFieldValue(fieldName, e.target.value);
  //   },
  //   value: getFieldValue(fieldName),
  // });

  return {
    getPageData,
    postPageData,
    patchPageData,
    deletePageData,
  };
};

export default usePageEdit;
