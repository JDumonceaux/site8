import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Menus } from '../services/types/Menus';
import { fetchMenu } from '../services/state/menuSlice';
import { AppDispatch, RootState } from '../services/state/store';

const useMenu = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selector = (state: RootState) => state.menu;
  const data: Menus | null = useSelector(selector).MenuData;
  const isLoading = useSelector(selector).isLoading;
  const error = useSelector(selector).error;

  const dispatchFetchMenu = useCallback(
    () => dispatch(fetchMenu()),
    [dispatch],
  );

  return {
    data,
    isLoading,
    error,
    fetchData: dispatchFetchMenu,
  };
};

export default useMenu;
