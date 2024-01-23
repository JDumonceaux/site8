import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../state/photosSlice';
import { AppDispatch, RootState } from '../state/store';
import { IPhotos } from '../api/models/photos/IPhotos';

const usePhotos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const photosData: IPhotos | null = useSelector(
    (state: RootState) => state.photos.photosData
  );
  const loading = useSelector((state: RootState) => state.photos.loading);
  const error = useSelector((state: RootState) => state.photos.error);

  const dispatchFetchPhotos = useCallback(
    () => dispatch(fetchPhotos()),
    [dispatch]
  );

  return {
    data: photosData,
    loading,
    error,
    fetchData: dispatchFetchPhotos,
  };
};

export default usePhotos;
