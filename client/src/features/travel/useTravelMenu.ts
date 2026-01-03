import { useMemo } from 'react';

import { createQueryHook } from '@hooks/createQueryHook';
import { ServiceUrl } from '@lib/utils/constants';
import type { MenuItem } from '@site8/shared';

// Travel menu response type
type TravelMenuResponse = {
  items: MenuItem[];
  metadata: {
    title: string;
  };
};

// Create the travel menu query hook using the factory
const useTravelMenuQuery = createQueryHook<TravelMenuResponse>({
  endpoint: `${ServiceUrl.ENDPOINT_TRAVEL}/menu`,
  queryKey: ['travel-menu'],
});

export type UseTravelMenuReturn = {
  data?: TravelMenuResponse;
  error: unknown;
  findMenuItem: (id: number) => MenuItem | undefined;
  getRootMenuItems: MenuItem[];
  isError: boolean;
  isLoading: boolean;
};

const useTravelMenu = (): UseTravelMenuReturn => {
  const { data, error, isError, isLoading } = useTravelMenuQuery();

  // Recursively search for a menu item by ID
  const findMenuItemRecursive = (
    items: MenuItem[],
    id: number,
  ): MenuItem | undefined => {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }
      if (item.items != null) {
        const found = findMenuItemRecursive(item.items, id);
        if (found != null) return found;
      }
    }
    return undefined;
  };

  const findMenuItem = (id: number): MenuItem | undefined => {
    if (data?.items == null) return undefined;
    return findMenuItemRecursive(data.items, id);
  };

  // Get root level menu items (countries) - memoized to prevent re-renders
  const getRootMenuItems = useMemo(() => data?.items ?? [], [data?.items]);

  return {
    data,
    error,
    findMenuItem,
    getRootMenuItems,
    isError,
    isLoading,
  };
};

export default useTravelMenu;
