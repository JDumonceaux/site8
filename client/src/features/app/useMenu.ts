import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu } from 'store/menuSlice';
import type { AppDispatch, RootState } from 'store/store';
import type { MenuItem } from 'types/MenuItem';

const selector = (state: RootState) => state.menu;

const useMenu = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data } = useSelector(selector);
  const { isLoading } = useSelector(selector);
  const { error } = useSelector(selector);

  const dispatchFetchMenu = useCallback(
    async () => dispatch(fetchMenu()),
    [dispatch],
  );

  const getMenu = useCallback(
    (sec1: string | undefined): MenuItem | null => {
      if (!sec1) {
        return null;
      }
      // Get the parent menu
      const menu = data?.items?.find((x: MenuItem) => x.to === sec1);

      return menu ?? null;
    },
    [data],
  );

  const getOtherMenus = useCallback(
    (id: number | undefined): MenuItem[] | null => {
      if (!id) {
        return null;
      }
      // Get the current menu
      const currentItem = data?.items?.find((x) => x.id === id);
      if (!currentItem) {
        return data?.items ?? null;
      }
      // // Get the parent menu (i.e. Root menu)
      // const parentItem = data?.items?.find(
      //   (x) => x.id === currentItem,
      // );
      // Return the other menus
      //return parentItem?.items?.filter((x) => x.id !== id);
      return null;
    },
    [data],
  );

  return {
    data,
    error,
    fetchData: dispatchFetchMenu,
    getMenu,
    getOtherMenus,
    isLoading,
  };
};

export default useMenu;
