import { createQueryHook } from '@hooks/createQueryHook';
import { ServiceUrl } from '@lib/utils/constants';
import type { Collection, TestsSection } from '@site8/shared';

const useTestsSectionsQuery = createQueryHook<Collection<TestsSection>>({
  endpoint: ServiceUrl.ENDPOINT_TESTS_SECTIONS,
  queryKey: ['tests', 'sections'],
});

const useTestsSections = () => {
  const query = useTestsSectionsQuery();

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useTestsSections;
