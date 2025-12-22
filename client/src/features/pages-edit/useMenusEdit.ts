import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import type { Menu } from '@types';
import { useQuery } from '@tanstack/react-query';

// Helper function to fetch menus edit data with support for aborting
const fetchData = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<Menu> => {
  const response = await fetch(ServiceUrl.ENDPOINT_MENUS_EDIT, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch menus edit: ${response.statusText}`);
  }
  return response.json() as Promise<Menu>;
};

const useMenusEdit = () => {
  const query = useQuery<Menu>({
    queryFn: fetchData,
    queryKey: ['menus-edit'],
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  return {
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useMenusEdit;
