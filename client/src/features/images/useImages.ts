import { apiClient } from '@lib/api';
import { ServiceUrl } from '@lib/utils/constants';
import type { ImageItem } from '@types';
import type { Collection } from '@site8/shared';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

type UseImagesParams = {
  readonly unmatchedOnly: boolean;
};

export type UseImagesResult = {
  readonly data: Collection<ImageItem> | undefined;
  readonly error: unknown;
  readonly isError: boolean;
  readonly isLoading: boolean;
};

const getEndpoint = (unmatchedOnly: boolean): string => {
  return unmatchedOnly
    ? ServiceUrl.ENDPOINT_IMAGES_UNMATCHED
    : ServiceUrl.ENDPOINT_IMAGES;
};

const useImages = ({ unmatchedOnly }: UseImagesParams): UseImagesResult => {
  const endpoint = getEndpoint(unmatchedOnly);

  const query: UseQueryResult<Collection<ImageItem>, unknown> = useQuery({
    queryFn: async ({ signal }): Promise<Collection<ImageItem>> => {
      return apiClient.get<Collection<ImageItem>>(endpoint, { signal });
    },
    queryKey: ['images', unmatchedOnly ? 'unmatched' : 'all', endpoint],
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useImages;
