import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Art } from '../types/Art';
import { fetchArt } from '../../services/state/artSlice';
import { AppDispatch, RootState } from '../../services/state/store';

const useArt = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selector = (state: RootState) => state.art;

  const data: Art | null = useSelector(selector).artData;
  const loading = useSelector(selector).loading;
  const error = useSelector(selector).error;

  const dispatchFetchArt = useCallback(() => dispatch(fetchArt()), [dispatch]);

  return {
    data,
    loading,
    error,
    fetchData: dispatchFetchArt,
  };
};

export default useArt;
