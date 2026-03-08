import { apiClient } from '@lib/api';
import { ServiceUrl } from '@lib/utils/constants';
import type { Collection, ImageFile } from '@site8/shared';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

export type MatchedFilter = 'all' | 'matchedOnly' | 'unmatchedOnly';

type UseImagesParams = {
  readonly folder: string;
  readonly matchedFilter: MatchedFilter;
};

export type UseImagesResult = {
  readonly data: Collection<ImageFile> | undefined;
  readonly error: unknown;
  readonly isError: boolean;
  readonly isLoading: boolean;
};

const useImages = ({
  folder,
  matchedFilter,
}: UseImagesParams): UseImagesResult => {
  const params = new URLSearchParams();
  params.set('matched', matchedFilter);
  if (folder) params.set('folder', folder);
  const endpoint = `${ServiceUrl.ENDPOINT_IMAGES}?${params.toString()}`;

  const query: UseQueryResult<Collection<ImageFile>, unknown> = useQuery({
    queryFn: async ({ signal }): Promise<Collection<ImageFile>> => {
      return apiClient.get<Collection<ImageFile>>(endpoint, { signal });
    },
    queryKey: ['images', 'all', matchedFilter, folder],
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useImages;
