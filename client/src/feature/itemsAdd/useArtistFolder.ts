import { useCallback } from 'react';

import { isValidArray } from 'lib/utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtists } from 'store/ArtistsSlice';
import type { AppDispatch, RootState } from 'store/store';

const selector = (state: RootState) => state.folders;

const useArtistFolder = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data } = useSelector(selector);
  const { isLoading } = useSelector(selector);
  const { error } = useSelector(selector);

  const dispatchFetchArtistFolder = useCallback(
    async () => dispatch(fetchArtists()),
    [dispatch],
  );

  const getData = useCallback(
    () =>
      isValidArray(data)
        ? data?.map((x, index) => ({ id: index + 1, value: x }))
        : undefined,
    [data],
  );

  return {
    data: getData(),
    error,
    fetchData: dispatchFetchArtistFolder,
    isLoading,
  };
};

export default useArtistFolder;
