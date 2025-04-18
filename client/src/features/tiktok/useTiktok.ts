import { useQuery } from '@tanstack/react-query';
import { QueryTime, ServiceUrl } from 'lib/utils';
import type { Page } from 'types';

const fetchData = async (id: string): Promise<Page> => {
  const response = await fetch(`${ServiceUrl.ENDPOINT_PAGE}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  return response.json() as Promise<Page>;
};

const useTiktok = (id: string) => {
  // Define the query key for caching purposes
  const queryKey = ['tiktok', id];

  const query = useQuery<Page>({
    // Cache the data for a specified time
    gcTime: QueryTime.GC_TIME,
    queryFn: async () => fetchData(id),
    queryKey,
    refetchInterval: 0,
    refetchIntervalInBackground: false,
    // Disable auto-refetching behaviors
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    // Retry configuration
    retry: QueryTime.RETRY,
    retryDelay: QueryTime.RETRY_DELAY,
    // Consider data fresh for a specified time
    staleTime: QueryTime.STALE_TIME,
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useTiktok;
