import { useQuery } from '@tanstack/react-query';
import { QueryTime, ServiceUrl } from 'lib/utils';
import type { Menu } from 'types';

// Helper function to fetch menus edit data
const fetchData = async (): Promise<Menu> => {
  const response = await fetch(ServiceUrl.ENDPOINT_MENUS_EDIT);
  if (!response.ok) {
    throw new Error(`Failed to fetch menus edit: ${response.statusText}`);
  }
  return response.json() as Promise<Menu>;
};

const useMenusEdit = () => {
  // Define the query key for caching purposes
  const queryKey = ['menus-edit'];

  const query = useQuery<Menu>({
    gcTime: QueryTime.GC_TIME,
    queryFn: fetchData,
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

export default useMenusEdit;
