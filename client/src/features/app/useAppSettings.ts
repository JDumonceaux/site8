import { useDispatch, useSelector } from 'react-redux';

import type { AppSettings } from '@shared/types/AppSettings';
import { save } from 'store/appSlice';
import type { AppDispatch, RootState } from 'store/store';

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

  const saveSettings = (updates: AppSettings) => {
    dispatch(save(updates));
  };

  const setShowAll = (showAll: boolean) => {
    saveSettings({ ...initialState, ...data, showAll });
  };

  const setShowPages = (showPages: boolean) => {
    saveSettings({ ...initialState, ...data, showPages });
  };

  const setShowUnmatched = (showUnmatched: boolean) => {
    saveSettings({ ...initialState, ...data, showUnmatched });
  };

  const reset = () => {
    saveSettings(initialState);
  };

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
