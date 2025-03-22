import { useQuery } from '@tanstack/react-query';
import { ServiceUrl } from 'lib/utils';
import type { Page } from 'types';

const useTiktok = (id: string) => {
  const { data, isError, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch(`${ServiceUrl.ENDPOINT_PAGE}/${id}`);
      return (await response.json()) as Page;
    },
    queryKey: ['tiktok', id],
  });

  return {
    data,
    isError,
    isPending,
  };
};

export default useTiktok;
