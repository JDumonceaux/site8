import { useQuery } from '@tanstack/react-query';
import { QueryTime, ServiceUrl } from 'lib/utils/constants';
import { handleQueryError } from 'lib/utils/errorHandler';
import { Page } from 'types';

// Helper function to fetch a generic page by id
const fn = async (id: string): Promise<Page> => {
  const response = await fetch(`${ServiceUrl.ENDPOINT_PAGE}/${id}`);
  if (!response.ok) {
    handleQueryError(response);
  }
  return response.json() as Promise<Page>;
};

const usePage = (id: string | undefined) => {
  // Define the query key based on the id
  const queryKey = ['page', id];

  const query = useQuery<Page>({
    enabled: Boolean(id),
    // Cache the data for 10 minutes
    gcTime: QueryTime.GC_TIME,
    // Only run the query if an id is provided
    queryKey: queryKey,
    queryFn: async () => fn(id as string),
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

export default usePage;
