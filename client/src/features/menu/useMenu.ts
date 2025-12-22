import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import type { Menu } from '@types';
import type { MenuItem } from '@types/MenuItem';
import { useQuery } from '@tanstack/react-query';

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
  getMenu: (to: string) => MenuItem | undefined;
  getOtherMenus: (id: number) => MenuItem[];
  isError: boolean;
  isLoading: boolean;
};

const useMenu = (): UseMenuReturn => {
  const { data, error, isError, isLoading } = useQuery<Menu>({
    queryFn: fetchMenu,
    queryKey: ['menu'],
    select: (menu) => ({
      ...menu,
      items: menu.items?.toSorted((a, b) => a.id - b.id),
    }),
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  const getMenu = (to: string) => data?.items?.find((item) => item.to === to);

  const getOtherMenus = (id: number) =>
    data?.items
      ?.toSorted((a, b) => a.id - b.id)
      .filter((item) => item.id !== id) ?? [];

  return {
    data,
    error,
    getMenu,
    getOtherMenus,
    isError,
    isLoading,
  };
};

export default useMenu;
