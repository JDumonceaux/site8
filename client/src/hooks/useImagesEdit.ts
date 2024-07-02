import { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'types/Image';
import { ServiceUrl } from 'utils';
import { z } from 'zod';

import { Images } from 'types';
import { ImageEdit } from 'types/ImageEdit';
import { useAxios } from './Axios/useAxios';
import { useFormArray } from './useFormArray';

// Define Zod Shape
const pageSchema = z.object({
  id: z.number(),
  localId: z.number(),
  name: z.string().max(100, 'Name max length exceeded: 100').trim().optional(),
  fileName: z.string().trim(),
  location: z
    .string({
      invalid_type_error: 'Location must be a string',
    })
    .max(250, 'Location max length exceeded: 500')
    .trim()
    .optional(),
  src: z.string().trim().optional(),
  folder: z.string().trim().optional(),
  official_url: z.string().trim().optional(),
  tags: z.string().trim().optional(),
  description: z.string().trim().optional(),
});

const useImagesEdit = () => {
  // Use Axios to fetch data
  const { data, isLoading, error, fetchData, patchData } = useAxios<Images>();
  // Create a type from the schema
  type FormType = z.infer<typeof pageSchema>;

  const [localItems, setLocalItems] = useState<Image[] | undefined>();

  // Does the data need to be saved?
  const [isSaved, setIsSaved] = useState<boolean>(true);
  // Is the form saving?
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Create a form
  const { formValues, getDefaultProps, setFormValues, setFieldValue } =
    useFormArray<FormType>();

  console.log('localItems', localItems);

  // Save to local - adding local index
  useEffect(() => {
    const indexedItems = data?.items?.map((x, index) => ({
      ...x,
      localId: index + 1,
    }));
    setLocalItems(indexedItems);
  }, [data?.items, setLocalItems]);

  useEffect(() => {
    const ret: FormType[] | undefined = localItems?.map((item) => {
      return {
        id: item.id || 0,
        localId: item.localId || 0,
        name: item.name || '',
        fileName: item.fileName || '',
        src: item.src || '',
        folder: item.folder || '',
        official_url: item.official_url || '',
        description: item.description || '',
        location: item.location || '',
        tags: '',
      };
    });
    if (ret) {
      setFormValues(ret);
    }
  }, [localItems, setFormValues]);

  // Scan the 'sort' directory for new items
  const scanForNewItems = useCallback(() => {
    fetchData(ServiceUrl.ENDPOINT_IMAGES_NEW);
  }, [fetchData]);

  const refreshItems = useCallback(() => {
    fetchData(ServiceUrl.ENDPOINT_IMAGES_FILE);
  }, [fetchData]);

  // Validate  form
  // const validateForm = useCallback(() => {
  //   const result = safeParse<FormType>(pageSchema, formValues);
  //   setErrors(result.error?.issues);
  //   return result.success;
  // }, [formValues, setErrors]);

  // Handle clear form
  const handleClear = useCallback(() => {
    setIsSaved(true);
    setIsProcessing(false);
  }, []);

  const getDifference = useCallback(
    (prev: string | undefined, update: string | undefined) => {
      const tempPrev =
        prev && prev?.trim().length > 0 ? prev?.trim() : undefined;
      const tempUpdate =
        update && update?.trim().length > 0 ? update?.trim() : undefined;
      // No change
      if (!tempPrev && !tempUpdate) {
        return { hasChange: false, value: undefined };
      }
      // No change
      if (tempPrev === tempUpdate) {
        return { hasChange: false, value: undefined };
      }
      if (tempUpdate) {
        return { hasChange: true, value: tempUpdate };
      }
      if (tempPrev && !tempUpdate) {
        return { hasChange: true, value: undefined };
      }
      return { hasChange: false, value: undefined };
    },
    [],
  );

  const getUpdates = useCallback(() => {
    const ret: ImageEdit[] = [];
    formValues.forEach((item) => {
      const prev = localItems?.find((x) => x.localId === item.localId);
      const tempName = getDifference(prev?.name, item.name);
      const tempLocation = getDifference(prev?.location, item.location);
      const tempDescription = getDifference(
        prev?.description,
        item.description,
      );
      const tempOfficialUrl = getDifference(
        prev?.official_url,
        item.official_url,
      );
      const tempFolder = getDifference(prev?.folder, item.folder);
      const tempFileName = getDifference(prev?.fileName, item.fileName);
      // const tempTags = getDifference(prev?.tags?.join(','), item.tags);

      if (
        tempName.hasChange ||
        tempLocation.hasChange ||
        tempDescription.hasChange ||
        tempOfficialUrl.hasChange ||
        tempFolder.hasChange ||
        tempFileName.hasChange
      ) {
        ret.push({
          id: item.id,
          name: tempName.hasChange ? tempName.value : prev?.name,
          location: tempLocation.hasChange
            ? tempLocation.value
            : prev?.location,
          description: tempDescription.hasChange
            ? tempDescription.value
            : prev?.description,
          official_url: tempOfficialUrl.hasChange
            ? tempOfficialUrl.value
            : prev?.official_url,
          folder: tempFolder.hasChange ? tempFolder.value : prev?.folder,
          fileName: tempFileName.hasChange
            ? tempFileName.value ?? ''
            : prev?.fileName ?? '',
        });
      }
    });
    return ret;
  }, [formValues, getDifference, localItems]);

  // Handle save
  const saveItems = useCallback(async () => {
    const updates = getUpdates();
    if (!updates) {
      return;
    }
    await patchData(`${ServiceUrl.ENDPOINT_IMAGES}`, { items: updates });
  }, [getUpdates, patchData]);

  // Handle form submission
  const submitForm = useCallback(() => {
    setIsProcessing(true);
    // if (validateForm()) {
    saveItems();
    setIsProcessing(false);
    setIsSaved(true);
    return true;
  }, [saveItems]);

  return useMemo(
    () => ({
      data: formValues,
      fetchData,
      isProcessing,
      isLoading,
      error,
      isSaved,
      handleClear,
      submitForm,
      scanForNewItems,
      getDefaultProps,
      setFieldValue,
      refreshItems,
    }),
    [
      formValues,
      fetchData,
      isProcessing,
      isLoading,
      error,
      isSaved,
      handleClear,
      submitForm,
      scanForNewItems,
      getDefaultProps,
      setFieldValue,
      refreshItems,
    ],
  );
};

export default useImagesEdit;
