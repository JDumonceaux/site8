import { useQuery } from '@tanstack/react-query';
import { QueryTime, ServiceUrl } from 'lib/utils/constants';
import type { Images } from 'types/Images';

// Helper function to fetch images
const fetchData = async (): Promise<Images> => {
  const response = await fetch(ServiceUrl.ENDPOINT_IMAGES);
  if (!response.ok) {
    throw new Error(`Failed to fetch images: ${response.statusText}`);
  }
  return response.json() as Promise<Images>;
};

const useImages = () => {
  // Define the query key for caching purposes
  const queryKey = ['images'];

  const query = useQuery<Images>({
    // Cache the data for a specified time
    gcTime: QueryTime.GC_TIME,
    queryFn: async () => fetchData(),
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

export default useImages;
