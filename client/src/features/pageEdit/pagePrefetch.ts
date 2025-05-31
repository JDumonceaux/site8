import type { QueryClient } from '@tanstack/react-query';
import type { LoaderFunction } from 'react-router-dom';
import { fetchPageById } from './api';
import { QueryTime } from 'lib/utils/constants';
import { assertIdParam } from 'lib/utils/helpers';

const prefetchPage = async (queryClient: QueryClient, id: string) => {
  await queryClient.prefetchQuery({
    queryFn: async () => fetchPageById(id),
    queryKey: ['page', id],
    staleTime: QueryTime.STALE_TIME_PREFETCH,
  });
};

export const pageLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ params }) => {
    const id = assertIdParam(params);
    await prefetchPage(queryClient, id);
    return null;
  };
