import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import type { Photos } from '@types';
import { useQuery } from '@tanstack/react-query';

// Helper function to fetch photos with support for cancellation
const fetchData = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<Photos> => {
  const response = await fetch(ServiceUrl.ENDPOINT_PHOTOS, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch photos: ${response.statusText}`);
  }
  return response.json() as Promise<Photos>;
};

const usePhotos = () => {
  const query = useQuery<Photos>({
    queryFn: fetchData,
    queryKey: ['photos'],
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default usePhotos;
