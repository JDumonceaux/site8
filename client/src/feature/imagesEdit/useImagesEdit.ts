import { useCallback, useState } from 'react';

import axios from 'axios';
import { useAxios } from 'hooks/Axios/useAxios';
import { ServiceUrl } from 'lib/utils/constants';
import type { Images } from 'types';
import type { ImageEdit } from 'types/ImageEdit';

const useImagesEdit = () => {
  // Use Axios to fetch data
  const { fetchData, patchData } = useAxios<Images>();
  const [data, setData] = useState<Images | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>();

  const fetchDataAsync = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<Images>(ServiceUrl.ENDPOINT_IMAGES_EDIT);
      setData(response.data);
    } catch (error_: unknown) {
      if (error_ instanceof Error) {
        setError(error_.message);
      } else {
        setError(String(error_));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Scan the 'sort' directory for new items
  const scanForNewItems = useCallback(() => {
    fetchData(ServiceUrl.ENDPOINT_IMAGES_SCAN);
  }, []);

  // Handle save
  const saveItems = async (updates: ImageEdit[]) => {
    return patchData(ServiceUrl.ENDPOINT_IMAGES, { items: updates });
  };

  return {
    data,
    error,
    fetchData: fetchDataAsync,
    isLoading,
    saveItems,
    scanForNewItems,
  };
};

export default useImagesEdit;
