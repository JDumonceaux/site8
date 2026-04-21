import { apiClient } from '@lib/api';
import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { Page } from '@types';

/**
 * Fetches a generic page by ID, with support for cancellation.
 */
const fetchGenericPage = async (
  id: string,
  signal: AbortSignal,
): Promise<Page> => {
  // sanitize ID to prevent accidental URL injection
  const url = `${ServiceUrl.ENDPOINT_GENERIC}/${encodeURIComponent(id)}`;
  return apiClient.get<Page>(url, { signal });
};

/**
 * Hook to load a generic page by ID.
 * Only runs when `id` is truthy, and automatically cancels on unmount or key change.
 */
export const useGenericPage = (id: string): UseQueryResult<Page, unknown> => {
  const query: UseQueryResult<Page, unknown> = useQuery({
    enabled: Boolean(id),
    queryFn: async ({ signal }) => fetchGenericPage(id, signal),
    queryKey: ['generic-page', id],
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  return query;
};

export default useGenericPage;
