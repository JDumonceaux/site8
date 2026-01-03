import { createQueryHook } from '@hooks/createQueryHook';
import { ServiceUrl } from '@lib/utils/constants';
import type { Photos } from '@types';

// Create the photos query hook using the factory
const usePhotosQuery = createQueryHook<Photos>({
  endpoint: ServiceUrl.ENDPOINT_PHOTOS,
  queryKey: ['photos'],
});

const usePhotos = () => {
  const query = usePhotosQuery();

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default usePhotos;
