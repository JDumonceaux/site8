import { useMemo } from 'react';

import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import type { ListItem } from '@shared/types';
import type { ArtistWithItems } from '@shared/types/ArtistWithItems';
import { useQuery } from '@tanstack/react-query';

/**
 * Represents the return value of the useArtistItems hook.
 */
type UseArtistItemsReturn = {
  /** The artist data along with their items. */
  data: ArtistWithItems | undefined;
  /** The error object if the query fails. */
  error: Error | null;
  /** A boolean indicating if the query resulted in an error. */
  isError: boolean;
  /** A boolean indicating if the query is currently loading. */
  isLoading: boolean;
  /** A memoized list of items formatted for UI lists. */
  itemsAsListItem: ListItem[];
};

/**
 * Options for the useArtistItems hook.
 */
type UseArtistItemsOptions = {
  /** Whether to enable the query. Defaults to true. */
  enabled?: boolean;
};

/**
 * Helper function to fetch artist items.
 * @param artistId - The ID of the artist to fetch.
 * @param signal - AbortSignal for cancelling the request.
 * @returns A promise that resolves to the artist with items data.
 * @throws Error if the fetch fails or returns a non-OK response.
 */
const fetchData = async (
  artistId: string,
  signal: AbortSignal,
): Promise<ArtistWithItems> => {
  try {
    const response = await fetch(
      ServiceUrl.ENDPOINT_ARTIST_ITEMS.replace('{0}', artistId),
      {
        signal,
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch artist items: ${response.status} ${response.statusText}`,
      );
    }
    return (await response.json()) as ArtistWithItems;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error;
    }
    throw new Error(
      `Failed to fetch artist items: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

/**
 * Custom hook to fetch an artist and their associated items.
 * @param artistId - The ID of the artist to fetch.
 * @param options - Optional configuration for the hook.
 * @returns An object containing the query state and derived item list.
 */
const useArtistItems = (
  artistId: string,
  options?: UseArtistItemsOptions,
): UseArtistItemsReturn => {
  const { enabled = true } = options ?? {};

  // Validate artistId
  if (!artistId && enabled) {
    throw new Error('artistId is required for useArtistItems');
  }

  // Define the query key to include the artistId for caching purposes
  const queryKey = ['artist-items', artistId] as const;

  const { data, error, isError, isLoading } = useQuery<ArtistWithItems>({
    enabled: enabled && Boolean(artistId),
    queryFn: async ({ signal }) => fetchData(artistId, signal),
    queryKey,
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  // Directly derive the list of items as ListItem[]
  const itemsAsListItem = useMemo(
    () =>
      (data?.items ?? [])
        .toSorted((a, b) => a.title.localeCompare(b.title))
        .map((x, index) => ({
          display: x.title,
          key: index,
          value: x.id,
        })),
    [data?.items],
  );

  return {
    data,
    error,
    isError,
    isLoading,
    itemsAsListItem,
  };
};

export default useArtistItems;
