import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { QueryTime, ServiceUrl } from 'lib/utils/constants';
import type { ArtistsItems, ListItem } from 'types';

// Helper function to fetch artists items data
const fetchData = async (): Promise<ArtistsItems> => {
  const response = await fetch(ServiceUrl.ENDPOINT_ARTISTS_ITEMS);
  if (!response.ok) {
    throw new Error(`Failed to fetch artists items: ${response.statusText}`);
  }
  return response.json() as Promise<ArtistsItems>;
};

const useArtistsItems = () => {
  // Define the query key for caching purposes
  const queryKey = ['artistsItems'];

  const query = useQuery<ArtistsItems>({
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
    staleTime: QueryTime.STALE_TIME,
  });

  // Memoize the derived list of items as ListItem[]
  const itemsAsListItem: ListItem[] | undefined = useMemo(() => {
    const sortedItems = query.data?.items?.toSorted((a, b) =>
      a.artist.sortName.localeCompare(b.artist.sortName),
    );

    let i = 0;
    const ret: ListItem[] = [];

    if (sortedItems) {
      for (const artist of sortedItems) {
        const items = artist.items?.filter(
          (y) => y.artistId === artist.artist.id,
        );
        if (items) {
          for (const y of items) {
            ret.push({
              display: `${artist.artist.sortName} - ${y.title}`,
              key: i++,
              value: y.id,
            });
          }
        }
      }
    }
    return ret;
  }, [query.data]);

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
    itemsAsListItem,
  };
};

export default useArtistsItems;
