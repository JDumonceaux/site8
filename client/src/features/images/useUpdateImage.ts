import { apiClient, ApiError } from '@lib/api';
import { ServiceUrl } from '@lib/utils/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UpdateImageParams = {
  readonly description?: string;
  readonly src: string;
  readonly targetFileName: string;
  readonly targetFolder?: string;
  readonly title: string;
};

type UpdateImageResponse = {
  readonly id: number;
  readonly ok: boolean;
  readonly src: string;
};

export type UseUpdateImageResult = {
  readonly isPending: boolean;
  readonly updateImage: (params: UpdateImageParams) => void;
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

const useUpdateImage = (
  onSuccess?: (response: UpdateImageResponse) => void,
  onError?: (error: Error) => void,
): UseUpdateImageResult => {
  const queryClient = useQueryClient();

  const { isPending, mutate: updateImage } = useMutation({
    mutationFn: async (
      params: UpdateImageParams,
    ): Promise<UpdateImageResponse> => {
      return apiClient.put<UpdateImageResponse>(
        ServiceUrl.ENDPOINT_IMAGE_UPDATE,
        {
          description: params.description,
          src: params.src,
          targetFileName: params.targetFileName,
          title: params.title,
          ...(params.targetFolder ? { targetFolder: params.targetFolder } : {}),
        },
      );
    },
    onError: (error) => {
      onError?.(new Error(getErrorMessage(error)));
    },
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: ['images'] });
      void queryClient.invalidateQueries({ queryKey: ['images', 'all'] });
      void queryClient.invalidateQueries({ queryKey: ['images', 'matched'] });
      void queryClient.invalidateQueries({
        queryKey: ['images', 'folders-2025'],
      });
      onSuccess?.(response);
    },
  });

  return {
    isPending,
    updateImage,
  };
};

export default useUpdateImage;
