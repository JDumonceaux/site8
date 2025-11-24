import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import { isValidArray } from '@lib/utils/helpers';
import { useQuery } from '@tanstack/react-query';

const useImageFolder = () => {
  const { data, isError, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch(ServiceUrl.ENDPOINT_IMAGES_FOLDERS);
      return (await response.json()) as string[];
    },
    queryKey: ['image-folders'],
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  const getData = () =>
    isValidArray(data)
      ? data?.map((x, index) => ({ id: index + 1, value: x }))
      : undefined;

  return {
    data: getData(),
    isError,
    isPending,
  };
};

export default useImageFolder;
