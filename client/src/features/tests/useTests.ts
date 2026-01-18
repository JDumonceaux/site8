import { createQueryHook } from '@hooks/createQueryHook';
import { ServiceUrl } from '@lib/utils/constants';
import type { Tests } from '@types';

// Create the AI tests query hook using the factory
const useTestsQuery = createQueryHook<Tests>({
  endpoint: ServiceUrl.ENDPOINT_TESTS_AI,
  queryKey: ['tests', 'ai'],
});

const useTests = () => {
  const query = useTestsQuery();

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useTests;
