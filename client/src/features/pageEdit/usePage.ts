import { useQuery } from '@tanstack/react-query';
import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from 'lib/utils/constants';
import { handleQueryError } from 'lib/utils/errorHandler';
import type { Page } from 'types';

// Helper function to fetch a generic page by id
const fetchPageById = async (
  id: string,
  signal?: AbortSignal,
): Promise<Page> => {
  const res = await fetch(`${ServiceUrl.ENDPOINT_PAGE}/${id}`, { signal });
  if (!res.ok) {
    handleQueryError(res);
  }
  return res.json();
};

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
