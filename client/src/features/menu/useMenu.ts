import { createQueryHook } from '@hooks/createQueryHook';
import { ServiceUrl } from '@lib/utils/constants';
import type { MenuItem } from '@site8/shared';
import type { Menu } from '../../types/Menu';

// Create the base query hook using the factory
const useMenuQuery = createQueryHook<Menu>({
  endpoint: ServiceUrl.ENDPOINT_MENUS,
  queryKey: ['menu'],
});

export type UseMenuReturn = {
  data?: Menu;
  error: unknown;
  findMenuItem: (to: string) => MenuItem | undefined;
  getRootMenuItems: () => MenuItem[];
  isError: boolean;
  isLoading: boolean;
};

const useMenu = (): UseMenuReturn => {
  const { data, error, isError, isLoading } = useMenuQuery();

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
