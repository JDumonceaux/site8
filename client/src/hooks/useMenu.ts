import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMenu } from 'services/state/menuSlice';
import { AppDispatch, RootState } from 'services/state/store';
import { Menu } from 'types';

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
      if (!sec1) {
        return undefined;
      }
      // Get the parent menu
      const menu = data?.items?.find((x) => x.to === sec1);
      if (!sec2) {
        return menu;
      }
      // Get the child menu
      return menu?.items?.find((x) => x.to === sec2);
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
