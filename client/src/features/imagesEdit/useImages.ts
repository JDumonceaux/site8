import { useQuery } from '@tanstack/react-query';

import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from 'lib/utils/constants';
import type { Images } from 'types/Images';

/**
 * Fetches the Images payload from the API, supporting cancellation.
 */
async function fetchImages({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<Images> {
  const res = await fetch(ServiceUrl.ENDPOINT_IMAGES, { signal });
  if (!res.ok) {
    throw new Error(`Failed to fetch images: ${res.statusText}`);
  }
  return res.json() as Promise<Images>;
}

/**
 * Custom hook to load a list of images.
 */
export function useImages() {
  const query = useQuery<Images>({
    queryKey: ['images'],
    queryFn: fetchImages,
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

export default useImages;
