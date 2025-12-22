import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import type { Tests } from '@types';
import { useQuery } from '@tanstack/react-query';

// Helper function to fetch test menus data with support for cancellation
const fetchTests = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<Tests> => {
  const response = await fetch(ServiceUrl.ENDPOINT_TESTS, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch tests: ${response.statusText}`);
  }
  return response.json() as Promise<Tests>;
};

const useTestMenus = () => {
  const query = useQuery<Tests>({
    queryFn: fetchTests,
    queryKey: ['tests'],
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useTestMenus;
