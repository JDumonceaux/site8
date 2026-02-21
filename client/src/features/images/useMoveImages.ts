import { apiClient } from '@lib/api';
import { ServiceUrl } from '@lib/utils/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type MoveImagesParams = {
  readonly imageSrcs: readonly string[];
  readonly targetFolder: string;
};

type MoveImagesResponse = {
  readonly movedCount: number;
  readonly ok: boolean;
};

export type UseMoveImagesResult = {
  readonly isPending: boolean;
  readonly moveImages: (params: MoveImagesParams) => void;
};

const useMoveImages = (
  onSuccess?: (movedCount: number) => void,
  onError?: (error: Error) => void,
): UseMoveImagesResult => {
  const queryClient = useQueryClient();

  const { isPending, mutate: moveImages } = useMutation({
    mutationFn: async (
      params: MoveImagesParams,
    ): Promise<MoveImagesResponse> => {
      return apiClient.post<MoveImagesResponse>(
        ServiceUrl.ENDPOINT_IMAGES_MOVE,
        {
          imageSrcs: params.imageSrcs,
          targetFolder: params.targetFolder,
        },
      );
    },
    onError: (error) => {
      const resolvedError =
        error instanceof Error ? error : new Error(String(error));
      onError?.(resolvedError);
    },
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: ['images'] });
      void queryClient.invalidateQueries({ queryKey: ['images', 'all'] });
      void queryClient.invalidateQueries({ queryKey: ['images', 'unmatched'] });
      void queryClient.invalidateQueries({
        queryKey: ['images', 'folders-2025'],
      });
      onSuccess?.(response.movedCount);
    },
  });

  return {
    isPending,
    moveImages,
  };
};

export default useMoveImages;
