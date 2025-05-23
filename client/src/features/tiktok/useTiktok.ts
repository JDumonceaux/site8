import { useQuery } from '@tanstack/react-query';
import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from 'lib/utils/constants';
import type { Page } from 'types';

export type UseTiktokResult = {
  data?: Page;
  error: unknown;
  isError: boolean;
  isLoading: boolean;
};

/**
 * Fetches a Page by ID from the API, supporting an AbortSignal.
 */
const fetchPageById = async (
  id: string,
  signal?: AbortSignal,
): Promise<Page> => {
  const res = await fetch(`${ServiceUrl.ENDPOINT_PAGE}/${id}`, { signal });
  if (!res.ok) {
    throw new Error(`Failed to fetch page ${id}: ${res.statusText}`);
  }
  return res.json() as Promise<Page>;
};

/**
 * Custom hook to load TikTok page data.
 */
export const useTiktok: (id: string) => UseTiktokResult = (id) => {
  const query = useQuery<Page>({
    queryFn: async ({ signal }) => fetchPageById(id, signal),
    queryKey: ['tiktok', id],
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useTiktok;
