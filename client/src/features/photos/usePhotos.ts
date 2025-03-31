import { useQuery } from '@tanstack/react-query';
import { QueryTime, ServiceUrl } from 'lib/utils';
import type { Photos } from 'types';

// Helper function to fetch photos
const fetchData = async (): Promise<Photos> => {
  const response = await fetch(ServiceUrl.ENDPOINT_PHOTOS);
  if (!response.ok) {
    throw new Error(`Failed to fetch photos: ${response.statusText}`);
  }
  return response.json() as Promise<Photos>;
};

const usePhotos = () => {
  // Define the query key for caching purposes
  const queryKey = ['photos'];

  const query = useQuery<Photos>({
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

export default usePhotos;
