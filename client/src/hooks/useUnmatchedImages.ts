import { apiClient } from '@lib/api';
import { ServiceUrl } from '@lib/utils/constants';
import { useQuery } from '@tanstack/react-query';
import type { Collection } from '@site8/shared';
import type { Image, Images } from '@types';

type UseUnmatchedImagesReturn = {
  readonly data: Images | undefined;
  readonly isError: boolean;
  readonly isPending: boolean;
};

/**
 * Custom hook to fetch unmatched images from the server
 * @returns Query state with unmatched images data
 */
const useUnmatchedImages = (enabled = true): UseUnmatchedImagesReturn => {
  const { data, isError, isPending } = useQuery<Images>({
    enabled,
    queryFn: async ({ signal }): Promise<Images> => {
      const response = await apiClient.get<Collection<Image>>(
        ServiceUrl.ENDPOINT_IMAGES_UNMATCHED,
        {
          signal,
        },
      );
      return response.items ?? [];
    },
    queryKey: ['images'],
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
