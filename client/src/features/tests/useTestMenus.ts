import { useQuery } from '@tanstack/react-query';
import { ServiceUrl } from 'lib/utils';
import type { Menu } from 'types';

const useTestMenus = () => {
  const { data, isError, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch(ServiceUrl.ENDPOINT_MENUS_EDIT);
      return (await response.json()) as Menu;
    },
    queryKey: ['tests'],
  });

  return {
    data,
    isError,
    isPending,
  };
};

export default useTestMenus;
