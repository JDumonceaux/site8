import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Music } from '../types/Music';
import { fetchMusic } from '../state/musicSlice';
import { AppDispatch, RootState } from '../state/store';

const useMusic = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selector = (state: RootState) => state.music;

  const data: Music | null = useSelector(selector).musicData;
  const loading = useSelector(selector).loading;
  const error = useSelector(selector).error;

  const dispatchFetchMusic = useCallback(
    () => dispatch(fetchMusic()),
    [dispatch],
  );

  return {
    data,
    loading,
    error,
    fetchData: dispatchFetchMusic,
  };
};

export default useMusic;
