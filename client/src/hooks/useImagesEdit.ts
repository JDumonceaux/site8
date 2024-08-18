import { ServiceUrl } from 'lib/utils/constants';
import { getSRC } from 'lib/utils/helpers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Images } from 'types';
import { Image } from 'types/Image';
import { ImageEdit } from 'types/ImageEdit';
import { z } from 'zod';

import { useAxios } from './Axios/useAxios';
import { useFormArray } from './useFormArray';

// Define Zod Shape
const pageSchema = z.object({
  delete: z.string().optional(),
  description: z.string().trim().optional(),
  duplicate: z.string().optional(),
  fileName: z.string().trim(),
  folder: z.string().trim().optional(),
  id: z.number(),
  localId: z.number(),
  location: z
    .string({
      invalid_type_error: 'Location must be a string',
    })
    .max(250, 'Location max length exceeded: 500')
    .trim()
    .optional(),
  name: z.string().max(100, 'Name max length exceeded: 100').trim().optional(),
  official_url: z.string().trim().optional(),
  src: z.string().optional(),
  tags: z.string().trim().optional(),
});

const useImagesEdit = () => {
  // Use Axios to fetch data
  const { data, error, fetchData, isLoading, patchData } = useAxios<Images>();
  // Create a type from the schema
  type FormType = z.infer<typeof pageSchema>;

  const [localItems, setLocalItems] = useState<Image[] | undefined>();

  // Does the data need to be saved?
  const [isSaved, setIsSaved] = useState<boolean>(true);
  // Is the form saving?
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Create a form
  const {
    formValues,
    getDefaultProps,
    getFieldValue,
    setFieldValue,
    setFormValues,
  } = useFormArray<FormType>();

  // Save to local - adding local index
  useEffect(() => {
    const indexedItems = data?.items?.map((x, index) => ({
      ...x,
      localId: index + 1,
    }));
    setLocalItems(indexedItems);
  }, [data?.items, setLocalItems]);

  useEffect(() => {
    const returnValue: FormType[] | undefined = localItems?.map((item) => {
      return {
        description: item.description || '',
        duplicate: String(item.isDuplicate) || 'false',
        fileName: item.fileName || '',
        folder: item.folder || '',
        id: item.id || 0,
        localId: item.localId || 0,
        location: item.location || '',
        name: item.name || '',
        official_url: item.official_url || '',
        src: getSRC(item.folder, item.fileName),
        tags: '',
      };
    });
    if (returnValue) {
      setFormValues(returnValue);
    }
  }, [localItems, setFormValues]);

  // Scan the 'sort' directory for new items
  const scanForNewItems = useCallback(() => {
    fetchData(ServiceUrl.ENDPOINT_IMAGES_SCAN);
  }, [fetchData]);

  const fetchItems = useCallback(() => {
    fetchData(ServiceUrl.ENDPOINT_IMAGES_NEW);
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
    (previous: string | undefined, update: string | undefined) => {
      const temporaryPrevious =
        previous && previous?.trim().length > 0 ? previous?.trim() : undefined;
      const temporaryUpdate =
        update && update?.trim().length > 0 ? update?.trim() : undefined;
      // No change
      if (!temporaryPrevious && !temporaryUpdate) {
        return { hasChange: false, value: undefined };
      }
      // No change
      if (temporaryPrevious === temporaryUpdate) {
        return { hasChange: false, value: undefined };
      }
      if (temporaryUpdate) {
        return { hasChange: true, value: temporaryUpdate };
      }
      if (temporaryPrevious && !temporaryUpdate) {
        return { hasChange: true, value: undefined };
      }
      return { hasChange: false, value: undefined };
    },
    [],
  );

  const getUpdates = useCallback(() => {
    const returnValue: ImageEdit[] = [];
    for (const item of formValues) {
      const previous = localItems?.find((x) => x.localId === item.localId);
      const temporaryName = getDifference(previous?.name, item.name);
      const temporaryLocation = getDifference(
        previous?.location,
        item.location,
      );
      const temporaryDescription = getDifference(
        previous?.description,
        item.description,
      );
      const temporaryOfficialUrl = getDifference(
        previous?.official_url,
        item.official_url,
      );
      const temporaryFolder = getDifference(previous?.folder, item.folder);
      const temporaryFileName = getDifference(
        previous?.fileName,
        item.fileName,
      );
      // const tempTags = getDifference(prev?.tags?.join(','), item.tags);

      if (
        temporaryName.hasChange ||
        temporaryLocation.hasChange ||
        temporaryDescription.hasChange ||
        temporaryOfficialUrl.hasChange ||
        temporaryFolder.hasChange ||
        temporaryFileName.hasChange
      ) {
        returnValue.push({
          description: temporaryDescription.hasChange
            ? temporaryDescription.value
            : previous?.description,
          fileName: temporaryFileName.hasChange
            ? (temporaryFileName.value ?? '')
            : (previous?.fileName ?? ''),
          folder: temporaryFolder.hasChange
            ? temporaryFolder.value
            : previous?.folder,
          id: item.id,
          location: temporaryLocation.hasChange
            ? temporaryLocation.value
            : previous?.location,
          name: temporaryName.hasChange ? temporaryName.value : previous?.name,
          official_url: temporaryOfficialUrl.hasChange
            ? temporaryOfficialUrl.value
            : previous?.official_url,
        });
      }
    }
    return returnValue;
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
      error,
      fetchData,
      fetchItems,
      getDefaultProps,
      getFieldValue,
      handleClear,
      isLoading,
      isProcessing,
      isSaved,
      scanForNewItems,
      setFieldValue,
      submitForm,
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
      getFieldValue,
      setFieldValue,
      fetchItems,
    ],
  );
};

export default useImagesEdit;
