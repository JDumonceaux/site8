import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import type { MenuItem } from '@site8/shared';

// Travel menu response type
type TravelMenuResponse = {
  items: MenuItem[];
  metadata: {
    title: string;
  };
};

// Helper function to fetch travel menu
const fetchTravelMenu = async (): Promise<TravelMenuResponse> => {
  const res = await fetch(`${ServiceUrl.ENDPOINT_TRAVEL}/menu`);
  if (!res.ok) {
    throw new Error(`Failed to fetch travel menu: ${res.statusText}`);
  }
  return res.json() as Promise<TravelMenuResponse>;
};

export type UseTravelMenuReturn = {
  data?: TravelMenuResponse;
  error: unknown;
  findMenuItem: (id: number) => MenuItem | undefined;
  getRootMenuItems: MenuItem[];
  isError: boolean;
  isLoading: boolean;
};

const useTravelMenu = (): UseTravelMenuReturn => {
  const { data, error, isError, isLoading } = useQuery<TravelMenuResponse>({
    queryFn: fetchTravelMenu,
    queryKey: ['travel-menu'],
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  // Recursively search for a menu item by ID
  const findMenuItemRecursive = (
    items: MenuItem[],
    id: number,
  ): MenuItem | undefined => {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }
      if (item.items) {
        const found = findMenuItemRecursive(item.items, id);
        if (found) return found;
      }
    }
    return undefined;
  };

  const findMenuItem = useMemo(
    () =>
      (id: number): MenuItem | undefined => {
        if (!data?.items) return undefined;
        return findMenuItemRecursive(data.items, id);
      },
    [data?.items],
  );

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
