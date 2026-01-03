import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import { handleQueryError } from '@lib/utils/errorHandler';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { Image } from '@types';

/**
 * Fetches an image by ID with support for cancellation.
 */
const fetchImage = async (id: string, signal: AbortSignal): Promise<Image> => {
  const url = `${ServiceUrl.ENDPOINT_IMAGE}/${encodeURIComponent(id)}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    handleQueryError(response);
    throw new Error(`Failed to fetch image ${id}: ${response.statusText}`);
  }

  return response.json() as Promise<Image>;
};

/**
 * Hook to load an image by ID.
 * Only runs when `id` is truthy, and automatically cancels on unmount or key change.
 */
const useImage = (
  id: null | string,
): {
  data?: Image;
  error: unknown;
  isError: boolean;
  isPending: boolean;
} => {
  const query: UseQueryResult<Image, unknown> = useQuery({
    enabled: Boolean(id),
    queryFn: async ({ signal }) => fetchImage(id as string, signal),
    queryKey: ['image', id],
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isPending: query.isPending,
  };
};

export default useImage;
