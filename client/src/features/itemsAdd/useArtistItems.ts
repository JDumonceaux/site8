import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';
import { ServiceUrl } from 'lib/utils/constants';
import type { ListItem } from 'types';
import type { ArtistItems } from 'types/ArtistItems';

const useArtistItems = () => {
  const { data, isError, isPending } = useQuery({
    // placeholderData: {
    //   items: [{ id: '0', title: 'Not Found' }],
    // },
    queryFn: async () => {
      const response = await fetch(
        ServiceUrl.ENDPOINT_ARTIST_ITEMS.replace('{0}', artistId),
      );
      return (await response.json()) as ArtistItems;
    },
    queryKey: ['artistItems'],
    retry: 3, // Retry 3 times
    retryDelay: 1000, // Wait 1 second between retries
  });

  // const fetch = useCallback(
  //   (artistId: string) => {
  //     fetchData(ServiceUrl.ENDPOINT_ARTIST_ITEMS.replace('{0}', artistId));
  //   },
  //   [fetchData],
  // );

  const itemsAsListItem: ListItem[] | undefined = useCallback(() => {
    return data.items
      .toSorted((a, b) => a.title.localeCompare(b.title))
      .map((x, index) => ({
        display: x.title,
        key: index,
        value: x.id,
      }));
  }, [data])();

  return {
    data,
    isError,
    isPending,
    itemsAsListItem,
  };
};

export default useArtistItems;
