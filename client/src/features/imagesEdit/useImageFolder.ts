import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';
import { ServiceUrl } from 'lib/utils';
import { isValidArray } from 'lib/utils/helpers';

const useImageFolder = () => {
  const { data, isError, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch(ServiceUrl.ENDPOINT_IMAGES_FOLDERS);
      return (await response.json()) as string[];
    },
    queryKey: ['image-folders'],
  });

  const getData = useCallback(
    () =>
      isValidArray(data)
        ? data?.map((x, index) => ({ id: index + 1, value: x }))
        : undefined,
    [data],
  );

  return {
    data: getData(),
    isError,
    isPending,
  };
};

export default useImageFolder;
