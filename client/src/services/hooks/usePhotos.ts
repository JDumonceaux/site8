import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Photos } from '../models/Photos';
import { fetchPhotos } from '../state/photosSlice';
import { AppDispatch, RootState } from '../state/store';

const usePhotos = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selector = (state: RootState) => state.photos;
  const data: Photos | null = useSelector(selector).photosData;
  const loading = useSelector(selector).loading;
  const error = useSelector(selector).error;

  const dispatchFetchPhotos = useCallback(
    () => dispatch(fetchPhotos()),
    [dispatch],
  );

  return {
    data,
    loading,
    error,
    fetchData: dispatchFetchPhotos,
  };
};

export default usePhotos;
