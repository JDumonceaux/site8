import { useQuery } from '@tanstack/react-query';
import { QueryTime, ServiceUrl } from '@lib/utils/constants';
import type { Bookmarks } from '../../types/Bookmarks';

const fetchData = async (): Promise<Bookmarks> => {
  try {
    const response = await fetch(ServiceUrl.ENDPOINT_BOOKMARKS);
    if (!RESPONSE.ok) {
      throw new Error(`Failed to fetch bookmarks: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
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
