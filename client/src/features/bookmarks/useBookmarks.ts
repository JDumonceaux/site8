import { QueryTime, QueryTimeComputed, ServiceUrl } from '@lib/utils/constants';
import { useQuery } from '@tanstack/react-query';
import type { Bookmarks } from '../../types/Bookmarks';

const fetchData = async (): Promise<Bookmarks> => {
  try {
    const response = await fetch(ServiceUrl.ENDPOINT_BOOKMARKS);
    if (!response.ok) {
      throw new Error(`Failed to fetch bookmarks: ${response.statusText}`);
    }
    return (await response.json()) as Bookmarks;
  } catch (error) {
    console.error('useBookmarks: Error fetching bookmarks', error);
    throw error;
  }
};

type UseBookmarksResult = {
  data: Bookmarks | undefined;
  error: unknown;
  isError: boolean;
  isLoading: boolean;
};

const useBookmarks = (): UseBookmarksResult => {
  const queryKey = ['bookmarks'];

  const query = useQuery<Bookmarks>({
    gcTime: QueryTimeComputed.GC_TIME,
    queryFn: fetchData,
    queryKey,
    refetchInterval: 0,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: QueryTime.RETRY,
    retryDelay: QueryTimeComputed.RETRY_DELAY,
    staleTime: QueryTimeComputed.STALE_TIME,
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useBookmarks;
