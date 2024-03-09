import useFetch from './useFetch';
import { BookmarksTags } from 'services/types';
import { ServiceUrl } from 'utils';

const useBookmarks = () => {
  const { data, isLoading, error } = useFetch<BookmarksTags>(
    `${ServiceUrl.ENDPOINT_BOOKMARKS}/tags`,
  );

  return {
    data,
    isLoading,
    error,
  };
};

export default useBookmarks;
