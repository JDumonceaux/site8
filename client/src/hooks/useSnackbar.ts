import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { save } from 'store/AppSlice';
import type { AppDispatch, RootState } from 'store/store';
import type { Snackbar } from 'types/Snackbar';

const DEFAULT_DURATION = 5000;

const initialState: Snackbar = {
  contents: null,
  isOpen: false,
  openDurationMs: 0,
};

/**
 * Custom hook for managing a snackbar.
 * @returns An object containing snackbar data, setMessage function, and closeSnackbar function.
 */
const useSnackbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data: null | Snackbar = useSelector(
    (state: RootState) => state.snackbar.data,
  );

  const updateSnackbar = useCallback(
    (data: Snackbar) => {
      dispatch(save(data));
      if (data.isOpen && data.openDurationMs) {
        setTimeout(() => {
          dispatch(save(initialState));
        }, data.openDurationMs);
      }
    },
    [dispatch],
  );

  const setMessage = useCallback(
    (contents: Snackbar['contents'], duration = DEFAULT_DURATION) => {
      updateSnackbar({
        contents,
        isOpen: true,
        openDurationMs: duration,
      });
    },
    [updateSnackbar],
  );

  const close = useCallback(() => {
    updateSnackbar(initialState);
  }, [updateSnackbar]);

  return {
    closeSnackbar: close,
    setMessage,
    snackbarData: data,
  };
};

export default useSnackbar;
