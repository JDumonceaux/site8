import { useQuery } from '@tanstack/react-query';
import { QueryTime, ServiceUrl } from 'lib/utils';
import type { Bookmarks } from 'types';

const fetchData = async (): Promise<Bookmarks> => {
  const response = await fetch(ServiceUrl.ENDPOINT_BOOKMARKS);
  if (!response.ok) {
    throw new Error(`Failed to fetch bookmarks: ${response.statusText}`);
  }
  return response.json();
};

const useBookmarks = () => {
  const queryKey = ['bookmarks'];

  const query = useQuery<Bookmarks>({
    gcTime: QueryTime.GC_TIME,
    queryFn: fetchData,
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

export default useBookmarks;
