import { QueryTime, QueryTimeComputed, ServiceUrl } from '@lib/utils/constants';
import type { Images } from '@site8/shared';
import { useQuery } from '@tanstack/react-query';

const fetchData = async (): Promise<Images> => {
  try {
    const response = await fetch(ServiceUrl.ENDPOINT_IMAGES as string);
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }
    return (await response.json()) as Images;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('useImages: Error fetching images', error);
    throw error;
  }
};

type UseImagesResult = {
  data: Images | undefined;
  error: unknown;
  isError: boolean;
  isLoading: boolean;
};

const useImages = (): UseImagesResult => {
  const queryKey = ['images'];

  const query = useQuery<Images>({
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

export default useImages;
