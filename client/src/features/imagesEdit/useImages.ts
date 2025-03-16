import { useQuery } from '@tanstack/react-query';
import { ServiceUrl } from 'lib/utils/constants';
import type { Images } from 'types';

const useImages = () => {
  const { data, isError, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch(ServiceUrl.ENDPOINT_IMAGES);
      return (await response.json()) as Images;
    },
    queryKey: ['images'],
  });

  // Scan the 'sort' directory for new items
  // const scanForNewItems = useCallback(() => {
  //   fetchData(ServiceUrl.ENDPOINT_IMAGES_SCAN);
  // }, [fetchData]);

  // // Handle save
  // const saveItems = async (updates: ImageAdd[]) => {
  //   return patchData(ServiceUrl.ENDPOINT_IMAGES, { items: updates });
  // };

  return {
    data,
    isError,
    isPending,
  };
};

export default useImages;
