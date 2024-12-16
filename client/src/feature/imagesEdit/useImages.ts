import { useCallback, useEffect } from 'react';

import useServerApi from 'hooks/Axios/useServerApi';
import { ServiceUrl } from 'lib/utils/constants';
import type { ImageAdd, Images } from 'types';

const useImages = () => {
  const { data, error, fetchData, isLoading, patchData } =
    useServerApi<Images>();

  useEffect(() => {
    fetchData(ServiceUrl.ENDPOINT_IMAGES);
  }, [fetchData]);

  // Scan the 'sort' directory for new items
  const scanForNewItems = useCallback(() => {
    fetchData(ServiceUrl.ENDPOINT_IMAGES_SCAN);
  }, [fetchData]);

  // Handle save
  const saveItems = async (updates: ImageAdd[]) => {
    return patchData(ServiceUrl.ENDPOINT_IMAGES, { items: updates });
  };

  return {
    data,
    error,
    isLoading,
    saveItems,
    scanForNewItems,
  };
};

export default useImages;
