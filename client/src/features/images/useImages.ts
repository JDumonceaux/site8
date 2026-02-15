import type { Collection, Image } from '@site8/shared';

import { apiClient } from '@lib/api';
import { ServiceUrl } from '@lib/utils/constants';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

type UseImagesParams = {
  readonly unmatchedOnly: boolean;
};

export type UseImagesResult = {
  readonly data: Collection<Image> | undefined;
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

  const query: UseQueryResult<Collection<Image>, unknown> = useQuery({
    queryFn: async ({ signal }): Promise<Collection<Image>> => {
      return apiClient.get<Collection<Image>>(endpoint, { signal });
    },
    queryKey: ['images', unmatchedOnly ? 'unmatched' : 'all'],
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useImages;
