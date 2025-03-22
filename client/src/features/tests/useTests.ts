import { useQuery } from '@tanstack/react-query';
import { ServiceUrl } from 'lib/utils';
import type { Tests } from 'types';

const useTestMenus = () => {
  const { data, isError, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch(ServiceUrl.ENDPOINT_TESTS);
      return (await response.json()) as Tests;
    },
    queryKey: ['tests'],
  });

  return {
    data,
    isError,
    isPending,
  };
};

export default useTestMenus;
