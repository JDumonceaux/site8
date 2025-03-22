import { useQuery } from '@tanstack/react-query';
import { ServiceUrl } from 'lib/utils';
import type { Photos } from 'types';

const usePhotos = () => {
  const { data, isError, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch(ServiceUrl.ENDPOINT_PHOTOS);
      return (await response.json()) as Photos;
    },
    queryKey: ['photos'],
  });

  return {
    data,
    isError,
    isPending,
  };
};

export default usePhotos;
