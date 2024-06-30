import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFolders } from 'services/state/folderSlice';
import { AppDispatch, RootState } from 'services/state/store';

const useImageFolder = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selector = (state: RootState) => state.folders;
  const data: string[] | null = useSelector(selector).data;
  const isLoading = useSelector(selector).isLoading;
  const error = useSelector(selector).error;

  const dispatchFetchImageFolder = useCallback(
    () => dispatch(fetchFolders()),
    [dispatch],
  );

  return {
    data,
    isLoading,
    error,
    fetchData: dispatchFetchImageFolder,
  };
};

export default useImageFolder;
