import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu } from 'store/MenuSlice';
import type { AppDispatch, RootState } from 'store/store';

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
    (sec1: string | undefined, sec2: string | undefined) => {
      if (!sec1) {
        return;
      }
      // Get the parent menu
      const menu = data?.items?.find((x: MenuItem) => x.to === sec1);
      if (!sec2) {
        return menu;
      }
      // Get the child menu
      return menu?.items?.find((x: MenuItem) => x.to === sec2);
    },
    [data],
  );

  const getOtherMenus = useCallback(
    (id: number | undefined) => {
      if (!id) {
        return;
      }
      // Get the current menu
      const currentItem = data?.items?.find((x) => x.id === id);
      if (!currentItem) {
        return data?.items;
      }
      // Get the parent menu (i.e. Root menu)
      const parentItem = data?.items?.find(
        (x) => x.id === currentItem.parentId,
      );
      // Return the other menus
      return parentItem?.items?.filter((x) => x.id !== id);
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
