import { useMemo } from 'react';

import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import type { Artists } from '@shared/types/Artists';
import type { ListItem } from '@shared/types/ListItem';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

type UseArtistsReturn = {
  readonly artistsAsListItem: ListItem[];
  readonly data: Artists | undefined;
  readonly error: Error | null;
  readonly isError: boolean;
  readonly isLoading: boolean;
};

/**
 * Helper function to fetch artists data
 */
const fetchData = async (): Promise<Artists> => {
  const response = await fetch(ServiceUrl.ENDPOINT_ARTISTS);
  if (!response.ok) {
    throw new Error(`Failed to fetch artists: ${response.statusText}`);
  }
  return response.json() as Promise<Artists>;
};

/**
 * Custom hook to fetch and process artists data
 * @returns Query state and processed artists list
 */
const useArtists = (): UseArtistsReturn => {
  const query: UseQueryResult<Artists> = useQuery<Artists>({
    queryFn: fetchData,
    queryKey: ['artists'],
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  // Memoize the list items computation
  const artistsAsListItem: ListItem[] = useMemo(() => {
    if (!query.data?.items) {
      return [];
    }

    return query.data.items
      .toSorted((a, b) => {
        const sortNameA = a.sortName ?? '';
        const sortNameB = b.sortName ?? '';
        return sortNameA.localeCompare(sortNameB);
      })
      .map((artist, index) => ({
        display: artist.name,
        key: index,
        value: artist.id,
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
