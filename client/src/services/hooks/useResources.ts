import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Resources } from '../models/Resources';
import { fetchResources } from '../state/resourcesSlice';
import { AppDispatch, RootState } from '../state/store';

const useResources = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selector = (state: RootState) => state.resources;

  const data: Resources | null = useSelector(selector).resourcesData;
  const loading = useSelector(selector).loading;
  const error = useSelector(selector).error;

  const dispatchFetchResources = useCallback(
    () => dispatch(fetchResources()),
    [dispatch],
  );

  return {
    data,
    loading,
    error,
    fetchData: dispatchFetchResources,
  };
};

export default useResources;
