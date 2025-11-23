import { useQuery } from '@tanstack/react-query';

import { ServiceUrl } from '@lib/utils/constants';
import type { Images } from '@shared/types';

const useImagesEdit = () => {
  const { data, isError, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch(ServiceUrl.ENDPOINT_IMAGES_EDIT);
      return (await response.json()) as Images;
    },
    queryKey: ['images-edit'],
  });

  return {
    data,
    isError,
    isPending,
  };
};

export default useImagesEdit;
