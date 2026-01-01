import { ServiceUrl } from '@lib/utils/constants';
import { createQueryHook } from '@hooks/createQueryHook';
import type { Tests } from '@types';

// Create the tests query hook using the factory
const useTestsQuery = createQueryHook<Tests>({
  endpoint: ServiceUrl.ENDPOINT_TESTS,
  queryKey: ['tests'],
});

const useTestMenus = () => {
  const query = useTestsQuery();

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useTestMenus;
