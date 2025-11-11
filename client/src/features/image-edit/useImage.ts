import { useQuery } from '@tanstack/react-query';

import { ServiceUrl } from '@lib/utils/constants';
import type { Image } from '../../types';

const useImage = (id: null | string) => {
  const { data, isError, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch(`${ServiceUrl.ENDPOINT_IMAGE}/${id}`);
      return (await response.json()) as Image;
    },
    queryKey: ['image', id],
  });

  return {
    data,
    isError,
    isPending,
  };
};

export default useImage;
