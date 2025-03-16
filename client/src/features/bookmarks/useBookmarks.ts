import { useQuery } from '@tanstack/react-query';
import { ServiceUrl } from 'lib/utils/constants';
import type { Bookmarks } from 'types';

const useBookmarks = () => {
  const { data, isError, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch(ServiceUrl.ENDPOINT_IMAGES);
      return (await response.json()) as Bookmarks;
    },
    queryKey: ['bookmarks'],
  });

  return {
    data,
    isError,
    isPending,
  };
};

export default useBookmarks;
