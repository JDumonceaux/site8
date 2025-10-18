import { useQuery } from '@tanstack/react-query';
import { ServiceUrl } from '@lib/utils/constants';
import type { Images } from '../../types';

const useUnmatchedImages = () => {
  const { data, isError, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch(ServiceUrl.ENDPOINT_IMAGES_SCAN);
      return (await response.json()) as Images;
    },
    queryKey: ['images'],
  });

  return {
    data,
    isError,
    isPending,
  };
};

export default useUnmatchedImages;
