import { useQuery } from '@tanstack/react-query';

import { ServiceUrl, USEQUERY_DEFAULT_OPTIONS } from '@lib/utils/constants';
import type { Artists } from '../../types/Artists';
import type { ListItem } from '../../types/ListItem';

// Helper function to fetch artists data
const fetchData = async (): Promise<Artists> => {
  const response = await fetch(ServiceUrl.ENDPOINT_ARTISTS);
  if (!response.ok) {
    throw new Error(`Failed to fetch artists: ${response.statusText}`);
  }
  return response.json() as Promise<Artists>;
};

const useArtists = () => {
  const queryKey = ['artists'];

  const query = useQuery<Artists>({
    queryFn: fetchData,
    queryKey,
    ...USEQUERY_DEFAULT_OPTIONS,
  });

  // Directly compute the list items on each render
  const artistsAsListItem: ListItem[] | undefined = query.data?.items
    ?.toSorted((a, b) => a.sortName.localeCompare(b.sortName))
    .map((x, index) => ({
      display: x.name,
      key: index,
      value: x.id,
    }));

  return {
    artistsAsListItem,
    data: query.data,
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
  };
};

export default useArtists;
