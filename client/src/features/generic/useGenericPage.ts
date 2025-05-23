import { useQuery } from '@tanstack/react-query';

import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from 'lib/utils/constants';
import { handleQueryError } from 'lib/utils/errorHandler';
import type { Page } from 'types';

/**
 * Fetches a generic page by ID, with support for cancellation.
 */
async function fetchGenericPage(
  id: string,
  signal: AbortSignal,
): Promise<Page> {
  const res = await fetch(`${ServiceUrl.ENDPOINT_GENERIC}/${id}`, {
    signal,
  });
  if (!res.ok) {
    // Delegates error handling/logging to your central handler,
    // then throw to let React Query register the failure.
    handleQueryError(res);
    throw new Error(`Failed to fetch page ${id}: ${res.statusText}`);
  }
  return res.json() as Promise<Page>;
}

/**
 * Hook to load a generic page by ID.
 * Only runs when `id` is truthy, and automatically cancels on unmount or key change.
 */
export function useGenericPage(id: string) {
  const query = useQuery<Page>({
    queryKey: ['generic-page', id],
    enabled: Boolean(id),
    queryFn: async ({ signal }) => fetchGenericPage(id, signal),
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  return {
    data: query.data,
    error: query.error,
    isLoading: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
  };
}

export default useGenericPage;
