import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArt } from 'services/state/artSlice';
import { AppDispatch, RootState } from 'services/state/store';
import { IArt } from 'services/api/models/art/IArt';

const useArt = () => {
  const dispatch = useDispatch<AppDispatch>();
  const artData: IArt | null = useSelector(
    (state: RootState) => state.art.artData
  );
  const loading = useSelector((state: RootState) => state.art.loading);
  const error = useSelector((state: RootState) => state.art.error);

  const dispatchFetchArt = useCallback(() => dispatch(fetchArt()), [dispatch]);

  return {
    data: artData,
    loading,
    error,
    fetchData: dispatchFetchArt,
  };
};

export default useArt;
