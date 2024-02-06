import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IMusic } from '../api/models/music/IMusic';
import { fetchMusic } from '../state/musicSlice';
import { AppDispatch, RootState } from '../state/store';

const useMusic = () => {
  const dispatch = useDispatch<AppDispatch>();
  const musicData: IMusic | null = useSelector(
    (state: RootState) => state.music.musicData,
  );
  const loading = useSelector((state: RootState) => state.music.loading);
  const error = useSelector((state: RootState) => state.music.error);

  const dispatchFetchMusic = useCallback(() => dispatch(fetchMusic()), [dispatch]);

  return {
    data: musicData,
    loading,
    error,
    fetchData: dispatchFetchMusic,
  };
};

export default useMusic;
