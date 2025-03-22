import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';
import { ServiceUrl } from 'lib/utils';
import type { Items, ListItem } from 'types';
import type { KeyValue } from 'types/KeyValue';

const useItems = () => {
  const { data, isError, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch(ServiceUrl.ENDPOINT_ITEMS);
      return (await response.json()) as Items;
    },
    queryKey: ['images'],
  });

  const getArtists = useCallback(() => {
    // Remove duplicates and sort and remove undefined
    return [...new Set(data?.items.map((x) => x.artist))]
      .filter((x) => x !== undefined)
      .toSorted((a, b) => a.localeCompare(b));
  }, [data]);

  const getLocations = useCallback(() => {
    return [...new Set(data?.items.map((x) => x.location))]
      .filter((x) => x !== undefined)
      .toSorted((a, b) => a.localeCompare(b));
  }, [data]);

  const getNames = useCallback(() => {
    return [...new Set(data?.items.map((x) => x.name))]
      .filter((x) => x !== undefined)
      .toSorted((a, b) => a.localeCompare(b));
  }, [data]);

  const getNamesFiltered = useCallback(
    (artist: string) => {
      return data?.items.filter((x) => x.artist === artist);
    },
    [data],
  );

  const getPeriods = useCallback(() => {
    return [...new Set(data?.items.map((x) => x.period))]
      .filter((x) => x !== undefined)
      .toSorted((a, b) => a.localeCompare(b));
  }, [data]);

  const getArtistsNames = useCallback(() => {
    return data?.items.toSorted((a, b) =>
      (a.artist ?? '').localeCompare(b.artist ?? ''),
    );
  }, [data]);

  const artistsIndexed: KeyValue[] | undefined = useCallback(() => {
    return getArtists().map((x, index) => ({ key: index, value: x }));
  }, [getArtists])();

  const artistsNamesIndexed: ListItem[] | undefined = useCallback(() => {
    return getArtistsNames()?.map((x, index) => ({
      display: `${x.artist} - ${x.name} (${x.year})`,
      key: index,
      value: x.id,
    }));
  }, [getArtistsNames])();

  const locationsIndexed: KeyValue[] | undefined = useCallback(() => {
    return getLocations().map((x, index) => ({ key: index, value: x }));
  }, [getLocations])();

  const namesIndexed: KeyValue[] | undefined = useCallback(() => {
    return getNames().map((x, index) => ({ key: index, value: x }));
  }, [getNames])();

  const periodsIndexed: KeyValue[] | undefined = useCallback(() => {
    return getPeriods().map((x, index) => ({ key: index, value: x }));
  }, [getPeriods])();

  return {
    artists: getArtists(),
    artistsIndexed,
    artistsNamesIndexed,
    data,
    getNamesFiltered,
    isError,
    isPending,
    locations: getLocations(),
    locationsIndexed,
    names: getNames(),
    namesIndexed,
    periods: getPeriods(),
    periodsIndexed,
  };
};

export default useItems;
