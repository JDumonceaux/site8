import { useQuery } from '@tanstack/react-query';
import { QueryTime, ServiceUrl } from 'lib/utils/constants';
import type { Tests } from 'types';

// Helper function to fetch test menus data
const fetchTests = async (): Promise<Tests> => {
  const response = await fetch(ServiceUrl.ENDPOINT_TESTS);
  if (!response.ok) {
    throw new Error(`Failed to fetch tests: ${response.statusText}`);
  }
  return response.json() as Promise<Tests>;
};

const useTestMenus = () => {
  // Define a unique query key for caching purposes
  const queryKey = ['tests'];

  const query = useQuery<Tests>({
    gcTime: QueryTime.GC_TIME,
    queryFn: fetchTests,
    queryKey,
    refetchInterval: 0,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: QueryTime.RETRY,
    retryDelay: QueryTime.RETRY_DELAY,
    staleTime: QueryTime.STALE_TIME,
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useTestMenus;
