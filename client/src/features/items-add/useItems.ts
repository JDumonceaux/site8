import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import { useQuery } from '@tanstack/react-query';
import type { Items, KeyValue , ListItem } from '@types';


const fetchData = async (): Promise<Items> =>
  Promise.try(async () => {
    const response = await fetch(ServiceUrl.ENDPOINT_ITEMS);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return response.json() as Promise<Items>;
  });

const useItems = () => {
  const { data, error, isError, isLoading } = useQuery<Items>({
    queryFn: fetchData,
    queryKey: ['items'],
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  const items = data?.items ?? [];

  const artists = new Set(items.map((x) => x.artist))
    .difference(new Set(['', null, undefined]))
    .values()
    .toArray()
    .filter((a): a is string => a !== undefined)
    .toSorted((a, b) => a.localeCompare(b));

  const locations = new Set(items.map((x) => x.location))
    .difference(new Set(['', null, undefined]))
    .values()
    .toArray()
    .filter((a): a is string => a !== undefined)
    .toSorted((a, b) => a.localeCompare(b));

  const titles = new Set(items.map((x) => x.title))
    .difference(new Set(['', null, undefined]))
    .values()
    .toArray()
    .filter((a): a is string => a !== undefined)
    .toSorted((a, b) => a.localeCompare(b));

  const periods = new Set(items.map((x) => x.artisticPeriod))
    .difference(new Set(['', null, undefined]))
    .values()
    .toArray()
    .filter((a): a is string => a !== undefined)
    .toSorted((a, b) => a.localeCompare(b));

  const getNamesFiltered = (artist: string) =>
    items.filter((x) => x.artist === artist);

  const artistsNames = items.toSorted((a, b) =>
    (a.artist ?? '').localeCompare(b.artist ?? ''),
  );

  const artistsIndexed: KeyValue[] = artists.map((value, key) => ({
    key,
    value,
  }));

  const artistsNamesIndexed: ListItem[] = artistsNames.map((item, key) => ({
    display: `${item.artist} - ${item.title} (${item.year})`,
    key,
    value: item.id,
  }));

  const locationsIndexed: KeyValue[] = locations.map((value, key) => ({
    key,
    value,
  }));

  const titlesIndexed: KeyValue[] = titles.map((value, key) => ({
    key,
    value,
  }));

  const periodsIndexed: KeyValue[] = periods.map((value, key) => ({
    key,
    value,
  }));

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
    periods,
    periodsIndexed,
    titles,
    titlesIndexed,
  };
};

export default useItems;
