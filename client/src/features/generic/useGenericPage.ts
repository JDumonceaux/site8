import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import { handleQueryError } from '@lib/utils/errorHandler';
import type { Page } from '../../types';

/**
 * Fetches a generic page by ID, with support for cancellation.
 */
const fetchGenericPage = async (
  id: string,
  signal: AbortSignal,
): Promise<Page> => {
  // sanitize ID to prevent accidental URL injection
  const url = `${ServiceUrl.ENDPOINT_GENERIC}/${encodeURIComponent(id)}`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    // centralized error handling/logging
    handleQueryError(res);
    throw new Error(`Failed to fetch page ${id}: ${res.statusText}`);
  }
  return res.json() as Promise<Page>;
};

/**
 * Hook to load a generic page by ID.
 * Only runs when `id` is truthy, and automatically cancels on unmount or key change.
 */
export const useGenericPage = (
  id: string,
): {
  data?: Page;
  error: unknown;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  refetch: () => void;
} => {
  const query: UseQueryResult<Page, unknown> = useQuery({
    enabled: Boolean(id),
    queryFn: async ({ signal }) => fetchGenericPage(id, signal),
    queryKey: ['generic-page', id],
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

export default useGenericPage;
