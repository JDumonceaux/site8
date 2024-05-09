import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMenu } from 'services/state/menuSlice';
import { AppDispatch, RootState } from 'services/state/store';
import { Menu } from 'services/types';

const useMenu = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selector = (state: RootState) => state.menu;
  const data: Menu | null = useSelector(selector).data;
  const isLoading = useSelector(selector).isLoading;
  const error = useSelector(selector).error;

  const dispatchFetchMenu = useCallback(
    () => dispatch(fetchMenu()),
    [dispatch],
  );

  const getMenu = useCallback(
    (sec1: string | undefined, sec2: string | undefined) => {
      // Get the parent menu
      const menu = data?.items?.find((x) => x.to === sec1);
      // Get the child menu
      const menu1 = menu?.items?.find((x) => x.to === sec2);
      return { menu: menu1 };
    },
    [data],
  );

  return {
    data,
    isLoading,
    error,
    getMenu,
    fetchData: dispatchFetchMenu,
  };
};

export default useMenu;
