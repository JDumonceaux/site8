import { useEffect } from 'react';

import useServerApi from 'hooks/Axios/useServerApi';
import { ServiceUrl } from 'lib/utils/constants';
import type { Bookmarks } from 'types';

const useBookmarks = () => {
  const { data, error, fetchData, isLoading } = useServerApi<Bookmarks>();

  useEffect(() => {
    fetchData(ServiceUrl.ENDPOINT_BOOKMARKS);
  }, [fetchData]);

  return {
    data,
    error,
    isLoading,
  };
};

export default useBookmarks;
