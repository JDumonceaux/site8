import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Bookmarks } from '../types/Bookmarks';
import { AppDispatch, RootState } from '../state/store';
import { fetchBookmarks } from 'services/state/bookmarksSlice';

const useBookmarks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selector = (state: RootState) => state.resources;

  const data: Bookmarks | null = useSelector(selector).bookmarksData;
  const loading = useSelector(selector).loading;
  const error = useSelector(selector).error;

  const dispatchFetchBookmarks = useCallback(
    () => dispatch(fetchBookmarks()),
    [dispatch],
  );

  return {
    data,
    loading,
    error,
    fetchData: dispatchFetchBookmarks,
  };
};

export default useBookmarks;
