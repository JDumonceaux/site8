import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuAbbr } from 'store/menuAbbrSlice';
import { AppDispatch, RootState } from 'store/store';
import { MenuAbbr } from 'types/MenuAbbr';

const useMenuAbbr = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selector = (state: RootState) => state.menuAbbr;
  const data: MenuAbbr[] | null = useSelector(selector).data;
  const isLoading = useSelector(selector).isLoading;
  const error = useSelector(selector).error;

  const dispatchFetch = useCallback(
    () => dispatch(fetchMenuAbbr()),
    [dispatch],
  );

  return {
    data,
    isLoading,
    error,
    fetchData: dispatchFetch,
  };
};

export default useMenuAbbr;
