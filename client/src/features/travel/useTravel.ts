import { ServiceUrl } from '@lib/utils/constants';
import { createQueryHook } from '@hooks/createQueryHook';
import type { Places } from '@types';

// Create the travel query hook using the factory
const useTravelQuery = createQueryHook<Places>({
  endpoint: ServiceUrl.ENDPOINT_TRAVEL,
  queryKey: ['travel'],
});

type UseTravelResult = {
  data: Places | undefined;
  error: unknown;
  isError: boolean;
  isLoading: boolean;
};

const useTravel = (): UseTravelResult => {
  const query = useTravelQuery();

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useTravel;
