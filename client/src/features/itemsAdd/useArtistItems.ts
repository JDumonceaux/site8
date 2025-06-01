import { useQuery } from '@tanstack/react-query';
import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from 'lib/utils/constants';
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
    queryFn: async () => fetchData(artistId),
    queryKey,
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  // Directly derive the list of items as ListItem[]
  const itemsAsListItem: ListItem[] | undefined = query.data?.items
    .toSorted((a, b) => a.title.localeCompare(b.title))
    .map((x, index) => ({
      display: x.title,
      key: index,
      value: x.id,
    }));

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
    itemsAsListItem,
  };
};

export default useArtistItems;
