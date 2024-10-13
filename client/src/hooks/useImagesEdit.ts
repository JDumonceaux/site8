import { ServiceUrl } from 'lib/utils/constants';
import { useCallback} from 'react';
import { Images } from 'types';
import { ImageEdit } from 'types/ImageEdit';
import { useAxios } from './Axios/useAxios';

const useImagesEdit = () => {
  // Use Axios to fetch data
  const { data, error, fetchData, isLoading, patchData } = useAxios<Images>();

  const fetchItems = useCallback(() => {
    fetchData(ServiceUrl.ENDPOINT_IMAGES_EDIT);
  }, [fetchData]);




  // Save to local - adding local index
  // useEffect(() => {
  //   const indexedItems = data?.items?.map((x, index) => ({
  //     ...x,
  //     localId: index + 1,
  //   }));
  //   setLocalItems(indexedItems);
  // }, [data?.items, setLocalItems]);

  // useEffect(() => {
  //   const returnValue: FormType[] | undefined = localItems?.map((item) => {
  //     return {
  //       description: item.description || '',
  //       duplicate: String(item.isDuplicate) || 'false',
  //       fileName: item.fileName || '',
  //       folder: item.folder || '',
  //       id: item.id || 0,
  //       localId: item.localId || 0,
  //       location: item.location || '',
  //       name: item.name || '',
  //       official_url: item.official_url || '',
  //       src: getSRC(item.folder, item.fileName),
  //       tags: '',
  //     };
  //   });
  //   if (returnValue) {
  //     setFormValues(returnValue);
  //   }
  // }, [localItems, setFormValues]);

  // Scan the 'sort' directory for new items
  const scanForNewItems = useCallback(() => {
    fetchData(ServiceUrl.ENDPOINT_IMAGES_SCAN);
  }, [fetchData]);


  // Validate  form
  // const validateForm = useCallback(() => {
  //   const result = safeParse<FormType>(schema, formValues);
  //   setErrors(result.error?.issues);
  //   return result.success;
  // }, [formValues, setErrors]);

  


  // Handle save
  const saveItems = async (updates: ImageEdit[]) => {
    if (!updates) {
      return;
    }
    await patchData(`${ServiceUrl.ENDPOINT_IMAGES}`, { items: updates });
  };


  return {
    data,
    error,
    fetchItems,
    saveItems,
    isLoading,
    scanForNewItems,
  };
};

export default useImagesEdit;
