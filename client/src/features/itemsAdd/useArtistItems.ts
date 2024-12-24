import { useCallback } from 'react';

import useServerApi from 'hooks/Axios/useServerApi';
import { ServiceUrl } from 'lib/utils/constants';
import type { ListItem } from 'types';
import type { ArtistItems } from 'types/ArtistItems';

const useArtistItems = () => {
  const { data, error, fetchData, isLoading } = useServerApi<ArtistItems>();

  const fetch = (artistId: string) => {
    fetchData((ServiceUrl.ENDPOINT_ARTISTS_ITEMS, artistId));
  };

  const itemsAsListItem: ListItem[] | undefined = useCallback(() => {
    return data?.items
      ?.toSorted((a, b) => a.title.localeCompare(b.title))
      .map((x, index) => ({
        display: x.title,
        key: index,
        value: x.id,
      }));
  }, [data])();

  return {
    data,
    error,
    fetch,
    isLoading,
    itemsAsListItem,
  };
};

export default useArtistItems;
