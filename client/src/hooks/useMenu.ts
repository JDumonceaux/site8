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

  const getLevel3 = useCallback(
    (url1: string | undefined, url2: string | undefined) => {
      const menu1 = data?.level1?.find((x) => x.url === url1);
      const menu2 = data?.level2?.find(
        (x) => x.url === url2 && x.parentId === menu1?.id,
      );
      const menu3 = data?.pages?.filter((x) => x.parentId === menu2?.id);
      return { menu1, menu2, menu3 };
    },
    [data],
  );

  const getRemaining = useCallback(
    (url1: string | undefined, url2: string | undefined) => {
      if (!data || !url1 || !url2) return undefined;
      const menu1 = data?.level1?.find((x) => x.url === url1);
      const menu2 = data?.level2?.find(
        (x) => x.url === url2 && x.parentId === menu1?.id,
      );
      const menu3 = data?.pages?.find((x) => x.parentId === menu2?.id);

      return { menu1, menu2, menu3 };
    },
    [data],
  );

  return {
    data,
    isLoading,
    error,
    getLevel,
    getLevel2,
    getLevel3,
    getRemaining,
    fetchData: dispatchFetchMenu,
  };
};

export default useMenu;
