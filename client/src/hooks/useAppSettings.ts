import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppSettings } from 'types/AppSettings';
import { save } from '../services/state/appSlice';
import { AppDispatch, RootState } from '../services/state/store';

const useAppSettings = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selector = (state: RootState) => state.appSettings;
  const data: AppSettings | null = useSelector(selector).data;

  const initialState: AppSettings = useMemo(
    () => ({
      showAll: false,
      showUnmatched: false,
      showPages: false,
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

  const setShowPages = useCallback(
    (value: boolean) => {
      updateAppSettingsDispatch({
        ...data,
        showPages: value,
      });
    },
    [data, updateAppSettingsDispatch],
  );

  const reset = useCallback(() => {
    updateAppSettingsDispatch({
      ...initialState,
    });
  }, [initialState, updateAppSettingsDispatch]);

  const showUnmatched = data?.showUnmatched ? data.showUnmatched : false;
  const showPages = data?.showPages ? data.showPages : false;

  return {
    data: data,
    setShowAll,
    setShowPages,
    showUnmatched,
    showPages,
    setShowUnmatched,
    reset,
  };
};

export default useAppSettings;
