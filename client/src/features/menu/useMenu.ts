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
  /** Search for a menu item by title (case-insensitive) */
  findMenuItem: (title: string) => MenuItem | undefined;
  getRootMenuItems: () => MenuItem[];
  isError: boolean;
  isLoading: boolean;
};

const useMenu = (): UseMenuReturn => {
  const { data, error, isError, isLoading } = useMenuQuery();

  const findMenuItem = (title: string): MenuItem | undefined => {
    if (!data?.items) return undefined;
    return data.items.find(
      (item) => item.title?.toLowerCase() === title.toLowerCase(),
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
