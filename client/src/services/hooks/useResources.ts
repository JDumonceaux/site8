import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResources } from '../state/resourcesSlice';
import { AppDispatch, RootState } from '../state/store';
import { IResources } from '../api/models/resources/IResources';

const useResources = () => {
  const dispatch = useDispatch<AppDispatch>();
  const resourcesData: IResources | null = useSelector(
    (state: RootState) => state.resources.resourcesData
  );
  const loading = useSelector((state: RootState) => state.resources.loading);
  const error = useSelector((state: RootState) => state.resources.error);

  const dispatchFetchResources = useCallback(
    () => dispatch(fetchResources()),
    [dispatch]
  );

  return {
    data: resourcesData,
    loading,
    error,
    fetchData: dispatchFetchResources,
  };
};

export default useResources;
