import { useQuery } from '@tanstack/react-query';
import { QueryTime, ServiceUrl } from 'lib/utils/constants';
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
    // cacheTime: QueryTime.GC_TIME, // how long unused cache stays in memory
    enabled: Boolean(id),
    queryFn: async ({ signal }: { signal?: AbortSignal }) =>
      fetchPageById(id, signal),
    queryKey: ['page', id],
    refetchInterval: QueryTime.REFETCH_INTERVAL, // polling interval (in ms)
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: QueryTime.RETRY,
    retryDelay: QueryTime.RETRY_DELAY,
    staleTime: QueryTime.STALE_TIME, // how long data is “fresh”
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default usePage;
