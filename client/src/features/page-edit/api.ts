import { ServiceUrl } from '@lib/utils/constants';
import { handleQueryError } from '@lib/utils/errorHandler';
import type { Page } from '@types';

// Helper function to fetch a generic page by id
export const fetchPageById = async (
  id: string,
  signal?: AbortSignal,
): Promise<Page> => {
  console.log('fetchPageById', id);
  const res = await fetch(`${ServiceUrl.ENDPOINT_PAGE}/${id}`, { signal });
  if (!res.ok) {
    handleQueryError(res);
  }
  return (await res.json()) as Promise<Page>;
};
