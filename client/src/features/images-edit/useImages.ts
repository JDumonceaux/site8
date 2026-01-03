import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import { useQuery } from '@tanstack/react-query';
import type { Images } from '@types';

/**
 * Fetches the Images payload from the API, supporting cancellation.
 */
const fetchImages = async ({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<Images> => {
  const res = await fetch(ServiceUrl.ENDPOINT_IMAGES, { signal });
  if (!res.ok) {
    throw new Error(`Failed to fetch images: ${res.statusText}`);
  }
  return res.json() as Promise<Images>;
};

/**
 * Custom hook to load a list of images.
 */
export const useImages = () => {
  const query = useQuery<Images>({
    queryFn: fetchImages,
    queryKey: ['images'],
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

export default useImages;
