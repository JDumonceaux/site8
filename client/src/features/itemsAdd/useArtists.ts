import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { QueryTime, ServiceUrl } from 'lib/utils/constants';
import type { Artists } from 'types/Artists';
import type { ListItem } from 'types/ListItem';

// Helper function to fetch artists data
const fetchData = async (): Promise<Artists> => {
  const response = await fetch(ServiceUrl.ENDPOINT_ARTISTS);
  if (!response.ok) {
    throw new Error(`Failed to fetch artists: ${response.statusText}`);
  }
  return response.json() as Promise<Artists>;
};

const useArtists = () => {
  // Define the query key for caching purposes
  const queryKey = ['artists'];

  const query = useQuery<Artists>({
    gcTime: QueryTime.GC_TIME,
    queryFn: fetchData,
    queryKey,
    refetchInterval: 0,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: QueryTime.RETRY,
    retryDelay: QueryTime.RETRY_DELAY,
  });

  // Memoize the derived list of artists as list items
  const artistsAsListItem: ListItem[] | undefined = useMemo(() => {
    return query.data?.items
      ?.toSorted((a, b) => a.sortName.localeCompare(b.sortName))
      .map((x, index) => ({
        display: x.name,
        key: index,
        value: x.id,
      }));
  }, [query.data]);

  return {
    artistsAsListItem,
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useArtists;
