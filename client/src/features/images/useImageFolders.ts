import { apiClient } from '@lib/api';
import { ServiceUrl } from '@lib/utils/constants';
import type { Collection } from '@site8/shared';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

export type UseImageFoldersResult = {
  readonly data: Collection<string> | undefined;
  readonly error: unknown;
  readonly isError: boolean;
  readonly isLoading: boolean;
};

const useImageFolders = (): UseImageFoldersResult => {
  const query: UseQueryResult<Collection<string>, unknown> = useQuery({
    queryFn: async ({ signal }): Promise<Collection<string>> => {
      return apiClient.get<Collection<string>>(
        ServiceUrl.ENDPOINT_IMAGES_2025_FOLDERS,
        { signal },
      );
    },
    queryKey: ['images', 'folders-2025'],
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useImageFolders;
