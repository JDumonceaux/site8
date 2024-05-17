import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../services/state/store';
import { AppSettings } from 'services/types/AppSettings';
import { save } from '../services/state/snackbarSlice';

const useAppSettings = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selector = (state: RootState) => state.appSettings;
  const data: AppSettings | null = useSelector(selector).data;

  const initialState: AppSettings = useMemo(
    () => ({
      showAll: false,
      showUnmatched: false,
    }),
    [],
  );

  const updateAppSettingsDispatch = useCallback(
    (data: AppSettings) => {
      dispatch(save(data));
    },
    [dispatch],
  );

  const setShowAll = useCallback(
    (value: boolean) => {
      updateAppSettingsDispatch({
        ...data,
        showAll: value,
      });
    },
    [data, updateAppSettingsDispatch],
  );

  const setShowUnmatched = useCallback(
    (value: boolean) => {
      updateAppSettingsDispatch({
        ...data,
        showUnmatched: value,
      });
    },
    [data, updateAppSettingsDispatch],
  );

  const reset = useCallback(() => {
    updateAppSettingsDispatch({
      ...initialState,
    });
  }, [initialState, updateAppSettingsDispatch]);

  const showUnmatched = data?.showUnmatched || false;

  return {
    data: data,
    setShowAll,
    showUnmatched,
    setShowUnmatched,
    reset,
  };
};

export default useAppSettings;
