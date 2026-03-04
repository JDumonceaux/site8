import { apiClient } from '@lib/api';
import { ServiceUrl } from '@lib/utils/constants';
import type { Collection , ImageFile } from '@site8/shared';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

type UseImagesParams = {
  readonly unmatchedOnly: boolean;
};

export type UseImagesResult = {
  readonly data: Collection<ImageFile> | undefined;
  readonly error: unknown;
  readonly isError: boolean;
  readonly isLoading: boolean;
};

const getEndpoint = (unmatchedOnly: boolean): string => {
  return unmatchedOnly
    ? ServiceUrl.ENDPOINT_IMAGES_MATCHED
    : ServiceUrl.ENDPOINT_IMAGES;
};

const useImages = ({ unmatchedOnly }: UseImagesParams): UseImagesResult => {
  const endpoint = getEndpoint(unmatchedOnly);

  const query: UseQueryResult<Collection<ImageFile>, unknown> = useQuery({
    queryFn: async ({ signal }): Promise<Collection<ImageFile>> => {
      return apiClient.get<Collection<ImageFile>>(endpoint, { signal });
    },
    queryKey: ['images', unmatchedOnly ? 'matched' : 'all', endpoint],
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useImages;
