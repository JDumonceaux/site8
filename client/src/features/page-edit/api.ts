import { apiClient } from '@lib/api';
import { ServiceUrl } from '@lib/utils/constants';
import type { Page } from '@types';

// Helper function to fetch a generic page by id
export const fetchPageById = async (
  id: string,
  signal?: AbortSignal,
): Promise<Page> => {
  return apiClient.get<Page>(`${ServiceUrl.ENDPOINT_PAGE}/${id}`, { signal });
};
