import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { save } from 'store/AppSlice';
import type { AppDispatch, RootState } from 'store/store';
import type { AppSettings } from 'types/AppSettings';

const selector = (state: RootState) => state.appSettings;

const useAppSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector(selector);

  const initialState: AppSettings = useMemo(
    () => ({
      showAll: false,
      showPages: false,
      showUnmatched: false,
    }),
    [],
  );

  const updateAppSettingsDispatch = (updates: AppSettings) => {
    dispatch(save(updates));
  };

  const setShowAll = (value: boolean) => {
    updateAppSettingsDispatch({
      ...data,
      showAll: value,
    });
  };

  const setShowUnmatched = (value: boolean) => {
    updateAppSettingsDispatch({
      ...data,
      showUnmatched: value,
    });
  };

  const setShowPages = (value: boolean) => {
    updateAppSettingsDispatch({
      ...data,
      showPages: value,
    });
  };

  const reset = () => {
    updateAppSettingsDispatch({
      ...initialState,
    });
  };

  const showUnmatched = data?.showUnmatched ?? false;
  const showPages = data?.showPages ?? false;

  return {
    data,
    reset,
    setShowAll,
    setShowPages,
    setShowUnmatched,
    showPages,
    showUnmatched,
  };
};

export default useAppSettings;
