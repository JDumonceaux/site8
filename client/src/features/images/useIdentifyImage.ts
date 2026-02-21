import { apiClient, ApiError } from '@lib/api';
import { ServiceUrl } from '@lib/utils/constants';
import { useMutation } from '@tanstack/react-query';

type IdentifyImageParams = {
  readonly src: string;
};

export type IdentifyImageResponse = {
  readonly description?: string;
  readonly ok: boolean;
  readonly result: string;
  readonly status: 'returned';
  readonly title?: string;
};

export type UseIdentifyImageResult = {
  readonly identifyImage: (
    params: IdentifyImageParams,
  ) => Promise<IdentifyImageResponse>;
  readonly isPending: boolean;
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

const useIdentifyImage = (): UseIdentifyImageResult => {
  const identifyEndpoint = `${ServiceUrl.ENDPOINT_IMAGES}/identify`;

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (
      params: IdentifyImageParams,
    ): Promise<IdentifyImageResponse> => {
      if (typeof identifyEndpoint !== 'string') {
        throw new TypeError('Invalid identify endpoint configuration');
      }

      return apiClient.post<IdentifyImageResponse>(
        identifyEndpoint,
        {
          src: params.src,
        },
        {
          retries: 0,
          timeoutMs: 60_000,
        },
      );
    },
  });

  const identifyImage = async (
    params: IdentifyImageParams,
  ): Promise<IdentifyImageResponse> => {
    try {
      return await mutateAsync(params);
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  return {
    identifyImage,
    isPending,
  };
};

export default useIdentifyImage;
