import { isValidArray } from 'lib/utils/helpers';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFolders } from 'store/folderSlice';
import { AppDispatch, RootState } from 'store/store';

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

  const getData = useCallback(
    () =>
      isValidArray(data)
        ? data?.map((x, index) => ({ id: index + 1, name: x }))
        : undefined,
    [data],
  );

  return {
    data: getData(),
    isLoading,
    error,
    fetchData: dispatchFetchImageFolder,
  };
};

export default useImageFolder;
