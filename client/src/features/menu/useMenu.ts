import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import { useQuery } from '@tanstack/react-query';
import type { Menu } from '../../types/Menu';
import type { MenuItem } from '@site8/shared';

// Helper function to fetch menus
const fetchMenu = async (): Promise<Menu> => {
  const res = await fetch(ServiceUrl.ENDPOINT_MENUS);
  if (!res.ok) {
    throw new Error(`Failed to fetch menus: ${res.statusText}`);
  }
  return res.json() as Promise<Menu>;
};

export type UseMenuReturn = {
  data?: Menu;
  error: unknown;
  findMenuItem: (to: string) => MenuItem | undefined;
  getRootMenuItems: () => MenuItem[];
  isError: boolean;
  isLoading: boolean;
};

const useMenu = (): UseMenuReturn => {
  const { data, error, isError, isLoading } = useQuery<Menu>({
    queryFn: fetchMenu,
    queryKey: ['menu'],
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  // Recursively search for a menu item by 'url' property
  const findMenuItem = (url: string): MenuItem | undefined => {
    if (!data?.items) return undefined;
    return Array.from(data.items).find(
      (item) => item.title.toLowerCase() === url.toLowerCase(),
    );
  };

  // Get root level menu items
  const getRootMenuItems = (): MenuItem[] => {
    return data?.items ?? [];
  };

  return {
    data,
    error,
    findMenuItem,
    getRootMenuItems,
    isError,
    isLoading,
  };
};

export default useMenu;
