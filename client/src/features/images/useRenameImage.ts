import { apiClient, ApiError } from '@lib/api';
import { ServiceUrl } from '@lib/utils/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type RenameImageParams = {
  readonly description?: string;
  readonly src: string;
  readonly targetFileName: string;
  readonly targetFolder: string;
};

type RenameImageResponse = {
  readonly ok: boolean;
  readonly src: string;
};

export type UseRenameImageResult = {
  readonly isPending: boolean;
  readonly renameImage: (params: RenameImageParams) => void;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    const { body } = error;
    if (
      typeof body === 'object' &&
      body !== null &&
      'error' in body &&
      typeof body.error === 'string'
    ) {
      return body.error;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

const useRenameImage = (
  onSuccess?: (response: RenameImageResponse) => void,
  onError?: (error: Error) => void,
): UseRenameImageResult => {
  const queryClient = useQueryClient();

  const { isPending, mutate: renameImage } = useMutation({
    mutationFn: async (
      params: RenameImageParams,
    ): Promise<RenameImageResponse> => {
      return apiClient.post<RenameImageResponse>(
        ServiceUrl.ENDPOINT_IMAGES_RENAME,
        {
          description: params.description,
          src: params.src,
          targetFileName: params.targetFileName,
          targetFolder: params.targetFolder,
        },
      );
    },
    onError: (error) => {
      onError?.(new Error(getErrorMessage(error)));
    },
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: ['images'] });
      void queryClient.invalidateQueries({ queryKey: ['images', 'all'] });
      void queryClient.invalidateQueries({ queryKey: ['images', 'unmatched'] });
      void queryClient.invalidateQueries({
        queryKey: ['images', 'folders-2025'],
      });
      onSuccess?.(response);
    },
  });

  return {
    isPending,
    renameImage,
  };
};

export default useRenameImage;
