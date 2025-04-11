import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';
import { QueryTime, ServiceUrl } from 'lib/utils/constants';
import type { Menu } from 'types';
import type { MenuItem } from 'types/MenuItem';

// Helper function to fetch images
const fetchData = async (): Promise<Menu> => {
  const response = await fetch(ServiceUrl.ENDPOINT_MENUS);
  if (!response.ok) {
    throw new Error(`Failed to fetch images: ${response.statusText}`);
  }
  return response.json() as Promise<Menu>;
};

const useMenu = () => {
  // Define the query key for caching purposes
  const queryKey = ['menu'];

  const query = useQuery<Menu>({
    // Cache the data for a specified time
    gcTime: QueryTime.GC_TIME,
    queryFn: async () => fetchData(),
    queryKey,
    refetchInterval: 0,
    refetchIntervalInBackground: false,
    // Disable auto-refetching behaviors
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    // Retry configuration
    retry: QueryTime.RETRY,
    retryDelay: QueryTime.RETRY_DELAY,
    // Consider data fresh for a specified time
    staleTime: QueryTime.STALE_TIME,
  });

  const getMenu = useCallback(
    (sec1: string | undefined): MenuItem | null => {
      if (!sec1) {
        return null;
      }
      // Get the parent menu
      const menu = query.data?.items?.find((x: MenuItem) => x.to === sec1);

      return menu ?? null;
    },
    [query.data],
  );

  const getOtherMenus = useCallback(
    (id: number | undefined): MenuItem[] | null => {
      if (!id) {
        return null;
      }
      // Get the current menu
      const currentItem = query.data?.items?.find((x) => x.id === id);
      if (!currentItem) {
        return query.data?.items ?? null;
      }
      // // Get the parent menu (i.e. Root menu)
      // const parentItem = data?.items?.find(
      //   (x) => x.id === currentItem,
      // );
      // Return the other menus
      //return parentItem?.items?.filter((x) => x.id !== id);
      return null;
    },
    [query.data],
  );

  return {
    data: query.data,
    error: query.error,
    getMenu,
    getOtherMenus,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useMenu;
