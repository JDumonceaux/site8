import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IMusic } from '../api/models/music/IMusic';
import { fetchMusic } from '../state/musicSlice';
import { AppDispatch, RootState } from '../state/store';

const useMusic = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selector = (state: RootState) => state.music;

  const data: IMusic | null = useSelector(selector).musicData;
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
