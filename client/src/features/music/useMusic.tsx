import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { QueryTime, ServiceUrl } from 'lib/utils/constants';
import type { Music } from 'types/Music';

// Helper function to fetch music data
const fetchData = async (): Promise<Music> => {
  const res = await axios.get<Music>(ServiceUrl.ENDPOINT_MUSIC);
  return res.data;
};

const useMusic = () => {
  // Define the query key for caching purposes
  const queryKey = ['music'];

  const query = useQuery<Music>({
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

export default useMusic;
