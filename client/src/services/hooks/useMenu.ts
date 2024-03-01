import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Menus } from '../types/Menus';
import { fetchMenu } from '../state/menuSlice';
import { AppDispatch, RootState } from '../state/store';

const useMenu = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selector = (state: RootState) => state.menu;
  const data: Menus | null = useSelector(selector).MenuData;
  const loading = useSelector(selector).loading;
  const error = useSelector(selector).error;

  const dispatchFetchMenu = useCallback(
    () => dispatch(fetchMenu()),
    [dispatch],
  );

  return {
    data,
    loading,
    error,
    fetchData: dispatchFetchMenu,
  };
};

export default useMenu;
