import { useQuery } from '@tanstack/react-query';
import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from 'lib/utils/constants';
import type { Menu } from 'types';

export type UseTestMenusResult = {
  data?: Menu;
  error: unknown;
  isError: boolean;
  isLoading: boolean;
};

/**
 * Fetch the editable menus from the API.
 */
const fetchMenusEdit = async (): Promise<Menu> => {
  const res = await fetch(ServiceUrl.ENDPOINT_MENUS_EDIT);
  if (!res.ok) {
    throw new Error(`Failed to fetch menus edit: ${res.statusText}`);
  }
  return res.json() as Promise<Menu>;
};

/**
 * Custom hook to load and cache the menus edit data.
 */
export const useTestMenus = (): UseTestMenusResult => {
  const query = useQuery<Menu>({
    queryFn: fetchMenusEdit,
    queryKey: ['menusEdit'],
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useTestMenus;
