import { useQuery } from '@tanstack/react-query';
import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from 'lib/utils/constants';
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
  const queryKey = ['artistsItems'];
  const query = useQuery<ArtistsItems>({
    queryFn: fetchData,
    queryKey,
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  // Derive the list of items as ListItem[]
  const itemsAsListItem: ListItem[] = [];
  const sortedItems = query.data?.items?.toSorted((a, b) =>
    a.artist.sortName.localeCompare(b.artist.sortName),
  );

  let i = 0;
  if (sortedItems) {
    for (const artist of sortedItems) {
      const items = artist.items?.filter(
        (y) => y.artistId === artist.artist.id,
      );
      if (items) {
        for (const y of items) {
          itemsAsListItem.push({
            display: `${artist.artist.sortName} - ${y.title}`,
            key: i++,
            value: y.id,
          });
        }
      }
    }
  }

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
    itemsAsListItem,
  };
};

export default useArtistsItems;
