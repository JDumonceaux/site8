import { useCallback, useEffect } from 'react';

import useServerApi from 'hooks/Axios/useServerApi';
import { ServiceUrl } from 'lib/utils/constants';
import type { ListItem } from 'types';
import type { Artists } from 'types/Artists';

const useArtists = () => {
  const { data, error, fetchData, isLoading } = useServerApi<Artists>();

  useEffect(() => {
    fetchData(ServiceUrl.ENDPOINT_ARTISTS);
  }, [fetchData]);

  const artistsAsListItem: ListItem[] | undefined = useCallback(() => {
    return data?.items?.map((x, index) => ({
      display: x.name,
      key: index,
      value: x.id,
    }));
  }, [data])();

  return {
    artistsAsListItem,
    data,
    error,
    isLoading,
  };
};

export default useArtists;
