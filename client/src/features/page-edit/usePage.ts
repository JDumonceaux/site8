import { USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import type { Page } from '@types';
import { useQuery } from '@tanstack/react-query';
import { fetchPageById } from './api';

const usePage = (id: string) => {
  const query = useQuery<Page>({
    enabled: Boolean(id),
    queryFn: async ({ signal }: { signal?: AbortSignal }) =>
      fetchPageById(id, signal),
    queryKey: ['page', id],
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default usePage;
