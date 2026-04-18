import { createQueryHook } from '@hooks/createQueryHook';
import { ServiceUrl } from '@lib/utils/constants';
import type { TestGroup } from '@site8/shared';

type TestGroupsResponse = {
  readonly groups: TestGroup[];
};

// Create the test groups query hook using the factory
const useTestGroupsQuery = createQueryHook<TestGroupsResponse>({
  endpoint: ServiceUrl.ENDPOINT_TESTS_GROUPS,
  queryKey: ['tests', 'groups'],
});

const useTestGroups = () => {
  const query = useTestGroupsQuery();

  return {
    data: query.data,
    error: query.error,
    groups: query.data?.groups ?? [],
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useTestGroups;
