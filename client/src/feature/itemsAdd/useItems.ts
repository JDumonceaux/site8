import { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from 'store/ItemsSlice';
import type { AppDispatch, RootState } from 'store/store';
import type { KeyValue } from 'types/KeyValue';

const selector = (state: RootState) => state.items;

const useItems = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, error, isLoading } = useSelector(selector);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

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
    // Remove duplicates and sort and remove undefined
    return [...new Set(data?.items.map((x) => x.artist))]
      .filter((x) => x !== undefined)
      .toSorted((a, b) => a.localeCompare(b));
  }, [data]);

  const artistsIndexed: KeyValue[] | undefined = useCallback(() => {
    return getArtists().map((x, index) => ({ key: index, value: x }));
  }, [getArtists])();

  const artistsNamesIndexed: KeyValue[] | undefined = useCallback(() => {
    return getArtistsNames().map((x, index) => ({ key: index, value: x }));
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
    error,
    getNamesFiltered,
    isLoading,
    locations: getLocations(),
    locationsIndexed,
    names: getNames(),
    namesIndexed,
    periods: getPeriods(),
    periodsIndexed,
  };
};

export default useItems;
