import { createQueryHook } from '@hooks/createQueryHook';
import { ServiceUrl } from '@lib/utils/constants';
import type { Collection, Test } from '@site8/shared';

const useTestsListQuery = createQueryHook<Collection<Test>>({
  endpoint: ServiceUrl.ENDPOINT_TESTS,
  queryKey: ['tests', 'list'],
});

const useTestsList = () => {
  const query = useTestsListQuery();

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useTestsList;
