import { createQueryHook } from '@hooks/createQueryHook';
import { ServiceUrl } from '@lib/utils/constants';
import type { Collection, TestGroup } from '@site8/shared';

const useTestsGroupsQuery = createQueryHook<Collection<TestGroup>>({
  endpoint: ServiceUrl.ENDPOINT_TESTS_GROUPS,
  queryKey: ['tests', 'groups'],
});

const useTestsGroups = () => {
  const query = useTestsGroupsQuery();

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useTestsGroups;
