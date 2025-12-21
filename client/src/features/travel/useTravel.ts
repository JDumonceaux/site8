import { QueryTime, ServiceUrl } from '@lib/utils/constants';
import type { Places } from '@shared/types/Places';
import { useQuery } from '@tanstack/react-query';

const fetchData = async (): Promise<Places> => {
  try {
    const response = await fetch(ServiceUrl.ENDPOINT_TRAVEL as string);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch travel destinations: ${response.statusText}`,
      );
    }
    return (await response.json()) as Places;
  } catch (error) {
    console.error('useTravel: Error fetching travel destinations', error);
    throw error;
  }
};

type UseTravelResult = {
  data: Places | undefined;
  error: unknown;
  isError: boolean;
  isLoading: boolean;
};

const useTravel = (): UseTravelResult => {
  const queryKey = ['travel'];

  const query = useQuery<Places>({
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

export default useTravel;
