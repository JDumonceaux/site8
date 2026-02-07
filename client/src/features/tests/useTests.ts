import { createQueryHook } from '@hooks/createQueryHook';
import { ServiceUrl } from '@lib/utils/constants';
import type { Tests } from '@types';

// Create the tests query hook using the factory
const useTestsQuery = createQueryHook<Tests>({
  endpoint: ServiceUrl.ENDPOINT_TESTS_SORTED,
  queryKey: ['tests'],
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
