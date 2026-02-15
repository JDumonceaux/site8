import { apiClient } from '@lib/api';
import { ServiceUrl } from '@lib/utils/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type DeleteImageParams = {
  readonly src: string;
};

type DeleteImageResponse = {
  readonly deletedFile: boolean;
  readonly ok: boolean;
  readonly removedEntries: number;
};

export type UseDeleteImageResult = {
  readonly deleteImage: (params: DeleteImageParams) => void;
  readonly isPending: boolean;
};

const useDeleteImage = (
  onSuccess?: (response: DeleteImageResponse) => void,
  onError?: (error: Error) => void,
): UseDeleteImageResult => {
  const queryClient = useQueryClient();

  const { isPending, mutate: deleteImage } = useMutation({
    mutationFn: async (
      params: DeleteImageParams,
    ): Promise<DeleteImageResponse> => {
      const srcQuery = encodeURIComponent(params.src);
      return apiClient.delete<DeleteImageResponse>(
        `${ServiceUrl.ENDPOINT_IMAGES_ITEM}?src=${srcQuery}`,
      );
    },
    onError: (error) => {
      const err = error instanceof Error ? error : new Error(String(error));
      onError?.(err);
    },
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: ['images'] });
      void queryClient.invalidateQueries({ queryKey: ['images', 'all'] });
      void queryClient.invalidateQueries({ queryKey: ['images', 'unmatched'] });
      onSuccess?.(response);
    },
  });

  return {
    deleteImage,
    isPending,
  };
};

export default useDeleteImage;
