import { useMemo, useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';
import { QueryTime, ServiceUrl } from 'lib/utils/constants';
import type { Items, ListItem } from 'types';
import type { KeyValue } from 'types/KeyValue';

// Helper function to fetch items
const fetchData = async (): Promise<Items> => {
  const response = await fetch(ServiceUrl.ENDPOINT_ITEMS);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  return response.json() as Promise<Items>;
};

const useItems = () => {
  // Define a unique query key for caching purposes
  const queryKey = ['items'];

  const query = useQuery<Items>({
    gcTime: QueryTime.GC_TIME,
    queryFn: fetchData,
    queryKey,
    refetchInterval: 0,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: QueryTime.RETRY,
    retryDelay: QueryTime.RETRY_DELAY,
    staleTime: QueryTime.STALE_TIME,
  });

  const { data, error, isError, isLoading } = query;

  // Derived arrays using useMemo for efficient recalculation
  const artists = useMemo(() => {
    return data?.items
      ? [...new Set(data.items.map((x) => x.artist))]
          .filter((x) => x !== undefined)
          .toSorted((a, b) => a.localeCompare(b))
      : [];
  }, [data]);

  const locations = useMemo(() => {
    return data?.items
      ? [...new Set(data.items.map((x) => x.location))]
          .filter((x) => x !== undefined)
          .toSorted((a, b) => a.localeCompare(b))
      : [];
  }, [data]);

  const names = useMemo(() => {
    return data?.items
      ? [...new Set(data.items.map((x) => x.name))]
          .filter((x) => x !== undefined)
          .toSorted((a, b) => a.localeCompare(b))
      : [];
  }, [data]);

  const periods = useMemo(() => {
    return data?.items
      ? [...new Set(data.items.map((x) => x.period))]
          .filter((x) => x !== undefined)
          .toSorted((a, b) => a.localeCompare(b))
      : [];
  }, [data]);

  // Function to filter items by artist
  const getNamesFiltered = useCallback(
    (artist: string) => {
      return data?.items.filter((x) => x.artist === artist) ?? [];
    },
    [data],
  );

  // Sorted list of artist items
  const artistsNames = useMemo(() => {
    return data?.items
      ? data.items.toSorted((a, b) =>
          (a.artist ?? '').localeCompare(b.artist ?? ''),
        )
      : [];
  }, [data]);

  // Index derived arrays
  const artistsIndexed: KeyValue[] = useMemo(() => {
    return artists.map((x, index) => ({ key: index, value: x }));
  }, [artists]);

  const artistsNamesIndexed: ListItem[] = useMemo(() => {
    return artistsNames.map((x, index) => ({
      display: `${x.artist} - ${x.name} (${x.year})`,
      key: index,
      value: x.id,
    }));
  }, [artistsNames]);

  const locationsIndexed: KeyValue[] = useMemo(() => {
    return locations.map((x, index) => ({ key: index, value: x }));
  }, [locations]);

  const namesIndexed: KeyValue[] = useMemo(() => {
    return names.map((x, index) => ({ key: index, value: x }));
  }, [names]);

  const periodsIndexed: KeyValue[] = useMemo(() => {
    return periods.map((x, index) => ({ key: index, value: x }));
  }, [periods]);

  return {
    artists,
    artistsIndexed,
    artistsNamesIndexed,
    data,
    error,
    getNamesFiltered,
    isError,
    isLoading,
    locations,
    locationsIndexed,
    names,
    namesIndexed,
    periods,
    periodsIndexed,
  };
};

export default useItems;
