import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { save } from 'store/AppSlice';
import { AppDispatch, RootState } from 'store/store';
import { AppSettings } from 'types/AppSettings';

const useAppSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selector = (state: RootState) => state.appSettings;
  const data: AppSettings | null = useSelector(selector).data;

  const initialState: AppSettings = useMemo(
    () => ({
      showAll: false,
      showPages: false,
      showUnmatched: false,
    }),
    [],
  );

  const updateAppSettingsDispatch = (data: AppSettings) => {
    dispatch(save(data));
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

  const showUnmatched = data?.showUnmatched ? data.showUnmatched : false;
  const showPages = data?.showPages ? data.showPages : false;

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
