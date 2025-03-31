import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { QueryTime, ServiceUrl } from 'lib/utils/constants';
import type { ListItem } from 'types';
import type { ArtistItems } from 'types/ArtistItems';

// Helper function to fetch artist items
const fetchData = async (artistId: string): Promise<ArtistItems> => {
  const response = await fetch(
    ServiceUrl.ENDPOINT_ARTIST_ITEMS.replace('{0}', artistId),
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch artist items: ${response.statusText}`);
  }
  return response.json() as Promise<ArtistItems>;
};

const useArtistItems = (artistId: string) => {
  // Define the query key to include the artistId for caching purposes
  const queryKey = ['artistItems', artistId];

  const query = useQuery<ArtistItems>({
    gcTime: QueryTime.GC_TIME,
    queryFn: async () => fetchData(artistId),
    queryKey,
    refetchInterval: 0,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    // Retry configuration
    retry: 3,
    retryDelay: 1000,
    staleTime: QueryTime.STALE_TIME,
  });

  // Memoize the derived list of items as ListItem[]
  const itemsAsListItem: ListItem[] | undefined = useMemo(() => {
    return query.data?.items
      ?.toSorted((a, b) => a.title.localeCompare(b.title))
      .map((x, index) => ({
        display: x.title,
        key: index,
        value: x.id,
      }));
  }, [query.data]);

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
    itemsAsListItem,
  };
};

export default useArtistItems;
