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
    const items = query.data?.items;
    if (!items) {
      return [];
    }

    const sortedItems = items.toSorted((a, b) => {
      const sortNameA = a.artist.sortName ?? '';
      const sortNameB = b.artist.sortName ?? '';
      return sortNameA.localeCompare(sortNameB);
    });

    const result: ListItem[] = [];
    let index = 0;

    for (const sortedItem of sortedItems) {
      const name = sortedItem.artist.sortName ?? '';
      if (sortedItem.items.length > 0) {
        for (const item of sortedItem.items) {
          result.push({
            display: `${name}/${item.title}`,
            key: index,
            value: `${sortedItem.artist.id}|${item.id}`,
          });
          index++;
        }
      }
    }

    return result;
  }, [query.data]);

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isPending,
    itemsAsListItem,
  };
};

export default useArtistsItems;
