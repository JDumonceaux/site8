import { useQuery } from '@tanstack/react-query';

import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from 'lib/utils/constants';
import type { Music } from 'types/Music';

/**
 * Fetches music data from the API, supporting cancellation via AbortSignal.
 */
async function fetchMusic({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<Music> {
  const response = await fetch(ServiceUrl.ENDPOINT_MUSIC, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch music: ${response.statusText}`);
  }
  return response.json() as Promise<Music>;
}

/**
 * Custom hook to load music data.
 */
export function useMusic() {
  const queryKey = ['music'];
  const query = useQuery<Music>({
    queryKey,
    queryFn: fetchMusic,
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  return {
    data: query.data,
    error: query.error,
    isLoading: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
}

export default useMusic;
