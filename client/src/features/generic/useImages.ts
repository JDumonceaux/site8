import { useQuery } from '@tanstack/react-query';
import { ServiceUrl } from 'lib/utils';
import type { Images } from 'types/Images';

const useImages = () => {
  const { data, isError, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch(ServiceUrl.ENDPOINT_IMAGES);
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

export default useImages;
