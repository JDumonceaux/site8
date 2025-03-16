import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';
import { ServiceUrl } from 'lib/utils/constants';
import type { ArtistsItems, ListItem } from 'types';

const useArtistsItems = () => {
  const { data, isError, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch(ServiceUrl.ENDPOINT_ARTISTS_ITEMS);
      return (await response.json()) as ArtistsItems;
    },
    queryKey: ['artistsItems'],
  });

  const itemsAsListItem = useCallback(() => {
    const sortedItems = data?.items?.toSorted((a, b) =>
      a.artist.sortName.localeCompare(b.artist.sortName),
    );

    let i = 0;
    const ret: ListItem[] = [];

    if (sortedItems) {
      for (const artist of sortedItems) {
        const items = artist.items?.filter(
          (y) => y.artistId === artist.artist.id,
        );
        if (items)
          for (const y of items) {
            ret.push({
              display: `${artist.artist.sortName} - ${y.title}`,
              key: i++,
              value: y.id,
            });
          }
      }
    }
    return ret;
  }, [data]);

  return {
    data,
    isError,
    isPending,
    itemsAsListItem: itemsAsListItem(),
  };
};

export default useArtistsItems;
