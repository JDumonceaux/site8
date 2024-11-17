import { useCallback } from 'react';

import { isValidArray } from 'lib/utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFolders } from 'store/FolderSlice';
import type { AppDispatch, RootState } from 'store/store';

const useImageFolder = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selector = (state: RootState) => state.folders;
  const { data } = useSelector(selector);
  const { isLoading } = useSelector(selector);
  const { error } = useSelector(selector);

  const dispatchFetchImageFolder = useCallback(
    async () => dispatch(fetchFolders()),
    [dispatch],
  );

  const getData = useCallback(
    () =>
      isValidArray(data)
        ? data?.map((x, index) => ({ id: index + 1, value: x }))
        : undefined,
    [data],
  );

  return {
    data: getData(),
    error,
    fetchData: dispatchFetchImageFolder,
    isLoading,
  };
};

export default useImageFolder;
