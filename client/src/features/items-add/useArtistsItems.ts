import { useMemo } from 'react';

import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { ArtistsItems, ListItem } from '@types';

type UseArtistsItemsReturn = {
  readonly data: ArtistsItems | undefined;
  readonly error: Error | null;
  readonly isError: boolean;
  readonly isLoading: boolean;
  readonly itemsAsListItem: ListItem[];
};

/**
 * Helper function to fetch artists items data
 */
const fetchData = async (): Promise<ArtistsItems> => {
  const response = await fetch(ServiceUrl.ENDPOINT_ARTISTS_ITEMS);
  if (!response.ok) {
    throw new Error(`Failed to fetch artists items: ${response.statusText}`);
  }
  return response.json() as Promise<ArtistsItems>;
};

/**
 * Custom hook to fetch and process artists items data
 * @returns Query state and processed items list
 */
const useArtistsItems = (): UseArtistsItemsReturn => {
  const query: UseQueryResult<ArtistsItems> = useQuery<ArtistsItems>({
    queryFn: fetchData,
    queryKey: ['artists-items'],
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  // Derive the list of items as ListItem[] using useMemo for performance
  const itemsAsListItem: ListItem[] = useMemo(() => {
    if (!query.data?.items) {
      return [];
    }

    const sortedItems = query.data.items.toSorted((a, b) => {
      const sortNameA = a.artist.sortName ?? '';
      const sortNameB = b.artist.sortName ?? '';
      return sortNameA.localeCompare(sortNameB);
    });

    const result: ListItem[] = [];
    let index = 0;

    for (const artist of sortedItems) {
      const items = artist.items.filter(
        (item) => item.artistId === artist.artist.id,
      );

      for (const item of items) {
        result.push({
          display: `${artist.artist.sortName ?? 'Unknown'} - ${item.title}`,
          key: index++,
          value: item.id,
        });
      }
    }

    return result;
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
