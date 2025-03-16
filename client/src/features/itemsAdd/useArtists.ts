import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';
import { ServiceUrl } from 'lib/utils/constants';
import type { Artists } from 'types/Artists';
import type { ListItem } from 'types/ListItem';

const fetchData = async () => {
  const response = await fetch(ServiceUrl.ENDPOINT_ARTISTS);
  return (await response.json()) as Artists;
};

const useArtists = () => {
  const { data, isError, isPending } = useQuery({
    queryFn: async () => fetchData(),
    queryKey: ['artists'],
    staleTime: 30_000,
  });

  const artistsAsListItem: ListItem[] | undefined = useCallback(() => {
    return data?.items
      ?.toSorted((a, b) => a.sortName.localeCompare(b.sortName))
      .map((x, index) => ({
        display: x.name,
        key: index,
        value: x.id,
      }));
  }, [data])();

  return {
    artistsAsListItem,
    data,
    isError,
    isPending,
  };
};

export default useArtists;
