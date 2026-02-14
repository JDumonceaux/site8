import { apiClient } from '@lib/api';
import { ServiceUrl } from '@lib/utils/constants';
import { useQuery } from '@tanstack/react-query';
import type { Images } from '@types';

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
      return apiClient.get<Images>(ServiceUrl.ENDPOINT_IMAGES_SCAN, {
        signal,
      });
    },
    queryKey: ['unmatched-images'],
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
