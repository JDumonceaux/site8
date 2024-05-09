import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuValues } from 'services/state/menuValuesSlice';

import { AppDispatch, RootState } from 'services/state/store';
import { MenuEntryFlat } from 'services/types/MenuEntryFlat';

const useMenuValues = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selector = (state: RootState) => state.menuValues;
  const data: MenuEntryFlat[] | null = useSelector(selector).data;
  const isLoading = useSelector(selector).isLoading;
  const error = useSelector(selector).error;

  const dispatchFetch = useCallback(
    () => dispatch(fetchMenuValues()),
    [dispatch],
  );

  return {
    data,
    isLoading,
    error,
    fetchData: dispatchFetch,
  };
};

export default useMenuValues;
