import { useQuery } from '@tanstack/react-query';
import { ServiceUrl } from 'lib/utils/constants';
import type { Page } from 'types';

const useGenericPage = (id: string | undefined) => {
  const { data, isError, isPending } = useQuery({
    queryFn: async () => {
      if (id) {
        const response = await fetch(`${ServiceUrl.ENDPOINT_PAGE_NAME}/${id}`);
        return (await response.json()) as Page;
      }
      return null;
    },
    queryKey: ['generic-page', id],
  });

  return {
    data,
    isError,
    isPending,
  };
};

export default useGenericPage;
