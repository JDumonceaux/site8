import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { save } from 'store/appSlice';
import type { AppDispatch, RootState } from 'store/store';
import type { AppSettings } from 'types/AppSettings';

// Default settings
const initialState: AppSettings = {
  showAll: false,
  showPages: false,
  showUnmatched: false,
};

const selectAppSettingsData = (state: RootState) => state.appSettings.data;

export type UseAppSettingsReturn = {
  data: AppSettings | null | undefined;
  reset: () => void;
  setShowAll: (showAll: boolean) => void;
  setShowPages: (showPages: boolean) => void;
  setShowUnmatched: (showUnmatched: boolean) => void;
  showAll: boolean | undefined;
  showPages: boolean | undefined;
  showUnmatched: boolean | undefined;
};

const useAppSettings = (): UseAppSettingsReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(selectAppSettingsData);

  const saveSettings = useCallback(
    (updates: AppSettings) => {
      dispatch(save(updates));
    },
    [dispatch],
  );

  const setShowAll = useCallback(
    (showAll: boolean) => {
      saveSettings({ ...initialState, ...data, showAll });
    },
    [data, saveSettings],
  );

  const setShowPages = useCallback(
    (showPages: boolean) => {
      saveSettings({ ...initialState, ...data, showPages });
    },
    [data, saveSettings],
  );

  const setShowUnmatched = useCallback(
    (showUnmatched: boolean) => {
      saveSettings({ ...initialState, ...data, showUnmatched });
    },
    [data, saveSettings],
  );

  const reset = useCallback(() => {
    saveSettings(initialState);
  }, [saveSettings]);

  return {
    data,
    reset,
    setShowAll,
    setShowPages,
    setShowUnmatched,
    showAll: data?.showAll ?? initialState.showAll,
    showPages: data?.showPages ?? initialState.showPages,
    showUnmatched: data?.showUnmatched ?? initialState.showUnmatched,
  };
};

export default useAppSettings;
