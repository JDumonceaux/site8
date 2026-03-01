import { apiClient } from '@lib/api';
import { ServiceUrl } from '@lib/utils/constants';
import type { Collection, ImageFile } from '@site8/shared';
import { useQuery } from '@tanstack/react-query';

type UseMatchedImagesReturn = {
  readonly data: ImageFile[] | undefined;
  readonly isError: boolean;
  readonly isPending: boolean;
};

/**
 * Custom hook to fetch matched images from the server
 * @returns Query state with matched images data
 */
const useUnmatchedImages = (enabled = true): UseMatchedImagesReturn => {
  const { data, isError, isPending } = useQuery<ImageFile[]>({
    enabled,
    queryFn: async ({ signal }): Promise<ImageFile[]> => {
      const response = await apiClient.get<Collection<ImageFile>>(
        ServiceUrl.ENDPOINT_IMAGES_MATCHED,
        {
          signal,
        },
      );
      return response.items ?? [];
    },
    queryKey: ['images', 'matched'],
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    data,
    isError,
    isPending,
  };
};

export default useUnmatchedImages;
