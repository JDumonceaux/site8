import { useQuery } from '@tanstack/react-query';
import { QueryTime, ServiceUrl } from 'lib/utils/constants';
import type { Page } from 'types';

// Helper function to fetch a generic page by id
const fetchGenericPage = async (id: string): Promise<Page> => {
  const response = await fetch(`${ServiceUrl.ENDPOINT_PAGE_NAME}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch generic page: ${response.statusText}`);
  }
  return response.json() as Promise<Page>;
};

const useGenericPage = (id: string | undefined) => {
  // Define the query key based on the id
  const queryKey = ['generic-page', id];

  const query = useQuery<Page>({
    enabled: Boolean(id),
    // Cache the data for 10 minutes
    gcTime: QueryTime.GC_TIME,
    // Only run the query if an id is provided
    queryFn: async () => fetchGenericPage(id as string),
    queryKey,
    refetchInterval: QueryTime.REFETCH_INTERVAL,
    refetchIntervalInBackground: false,
    // Disable auto-refetching behaviors
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    // Retry up to QueryTime.RETRY times with a delay of QueryTime.RETRY_DELAY between attempts
    retry: QueryTime.RETRY,
    retryDelay: QueryTime.RETRY_DELAY,
    // Consider data fresh for 5 minutes
    staleTime: QueryTime.STALE_TIME,
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useGenericPage;
