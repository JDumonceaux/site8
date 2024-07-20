import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { save } from 'store/appSlice';
import { AppDispatch, RootState } from 'store/store';
import { AppSettings } from 'types/AppSettings';

const useAppSettings = () => {
  const dispatch = useDispatch<AppDispatch>();

  const data: AppSettings | null = useSelector(
    (state: RootState) => state.appSettings.data,
  );

  const initialState: AppSettings = {
    showAll: false,
    showUnmatched: false,
    showPages: false,
  };

  const updateAppSettingsDispatch = (newData: AppSettings) => {
    dispatch(save(newData));
  };

  const setSetting = useCallback(
    (key: keyof AppSettings, value: boolean) => {
      if (data) {
        updateAppSettingsDispatch({
          ...data,
          [key]: value,
        });
      }
    },
    [data, updateAppSettingsDispatch],
  );

  const setShowAll = (value: boolean) => setSetting('showAll', value);
  const setShowUnmatched = (value: boolean) =>
    setSetting('showUnmatched', value);
  const setShowPages = (value: boolean) => setSetting('showPages', value);

  const reset = () => {
    updateAppSettingsDispatch(initialState);
  };

  const showUnmatched = data?.showUnmatched ?? false;
  const showPages = data?.showPages ?? false;

  return {
    data,
    setShowAll,
    setShowPages,
    showUnmatched,
    showPages,
    setShowUnmatched,
    reset,
  };
};

export default useAppSettings;
