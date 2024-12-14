import { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from 'store/ItemsSlice';
import type { AppDispatch, RootState } from 'store/store';

const selector = (state: RootState) => state.items;

const useItems = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, error, isLoading } = useSelector(selector);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const getArtists = useCallback(() => {
    return data?.items.map((x) => x.artist);
  }, [data]);

  const getLocations = useCallback(() => {
    return data?.items.map((x) => x.location);
  }, [data]);

  const getNames = useCallback(() => {
    return data?.items.map((x) => x.name);
  }, [data]);

  const getNamesFiltered = useCallback(
    (artist: string) => {
      return data?.items.filter((x) => x.artist === artist);
    },
    [data],
  );

  const getPeriod = useCallback(() => {
    return data?.items.map((x) => x.period);
  }, [data]);

  return {
    artists: getArtists(),
    data,
    error,
    getNamesFiltered,
    isLoading,
    locations: getLocations(),
    names: getNames(),
    periods: getPeriod(),
  };
};

export default useItems;
