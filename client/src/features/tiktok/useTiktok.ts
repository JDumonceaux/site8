import { ServiceUrl } from '@lib/utils/constants';
import { createParameterizedQueryHook } from '@hooks/createQueryHook';
import type { Page } from '@types';

export type UseTiktokResult = {
  data?: Page;
  error: unknown;
  isError: boolean;
  isLoading: boolean;
};

/**
 * Custom hook to load TikTok page data using createParameterizedQueryHook factory.
 */
const useTiktokQuery = createParameterizedQueryHook<Page, { id: string }>(
  ({ id }) => ({
    endpoint: `${ServiceUrl.ENDPOINT_PAGE}/${id}`,
    queryKey: ['tiktok', id],
  }),
);

export const useTiktok: (id: string) => UseTiktokResult = (id) => {
  const query = useTiktokQuery({ id });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useTiktok;
