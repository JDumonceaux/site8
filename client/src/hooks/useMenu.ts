import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Pages } from '../services/types/Pages';
import { fetchMenu } from '../services/state/menuSlice';
import { AppDispatch, RootState } from '../services/state/store';

const useMenu = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selector = (state: RootState) => state.menu;
  const data: Pages | null = useSelector(selector).MenuData;
  const isLoading = useSelector(selector).isLoading;
  const error = useSelector(selector).error;

  const dispatchFetchMenu = useCallback(
    () => dispatch(fetchMenu()),
    [dispatch],
  );

  const getLevel = useCallback(
    (id: number) => {
      if (!data || !data.level2) return undefined;
      return data.level2.filter((x) => x.parentId === id);
    },
    [data],
  );

  const getLevel2 = useCallback(
    (id: number) => {
      if (!data || !data.pages) return undefined;
      return data.pages.filter((x) => x.parentId === id);
    },
    [data],
  );

  return {
    data,
    isLoading,
    error,
    getLevel,
    getLevel2,
    fetchData: dispatchFetchMenu,
  };
};

export default useMenu;
