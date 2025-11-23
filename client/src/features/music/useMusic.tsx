import { useQuery } from '@tanstack/react-query';

import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import type { Music } from '@shared/types/Music';

/**
 * Fetches music data from the API, supporting cancellation via AbortSignal.
 */
const fetchMusic = async ({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<Music> => {
  const response = await fetch(ServiceUrl.ENDPOINT_MUSIC, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch music: ${response.statusText}`);
  }
  return response.json() as Promise<Music>;
};

/**
 * Custom hook to load music data.
 */
export const useMusic = () => {
  const queryKey = ['music'];
  const query = useQuery<Music>({
    queryFn: fetchMusic,
    queryKey,
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isFetching: query.isFetching,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
};

export default useMusic;
