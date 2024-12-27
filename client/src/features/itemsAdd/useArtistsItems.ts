import { useCallback, useEffect } from 'react';

import useServerApi from 'hooks/Axios/useServerApi';
import { ServiceUrl } from 'lib/utils/constants';
import type { ArtistsItems, ListItem } from 'types';

const useArtistsItems = () => {
  const { data, error, fetchData, isLoading } = useServerApi<ArtistsItems>();

  useEffect(() => {
    fetchData(ServiceUrl.ENDPOINT_ARTISTS_ITEMS);
  }, [fetchData]);

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
              // eslint-disable-next-line no-plusplus
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
    error,
    isLoading,
    itemsAsListItem: itemsAsListItem(),
  };
};

export default useArtistsItems;
