import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { save } from 'store/SnackbarSlice';
import type { AppDispatch, RootState } from 'store/store';

const DEFAULT_DURATION = 5000;

export type Snackbar = {
  contents: null | React.ReactNode;
  isOpen: boolean;
  openDurationMs?: number;
  showCloseButton?: boolean;
  variant?: SnackbarVariant;
};

export enum SnackbarVariant {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
}

const initialState: Snackbar = {
  contents: null,
  isOpen: false,
  openDurationMs: 0,
};

const selectSnackbarData = (state: RootState) => state.snackbar.data;

/**
 * Custom hook for managing a snackbar.
 * @returns An object containing snackbar data, setMessage function, and closeSnackbar function.
 */
const useSnackbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data: null | Snackbar = useSelector(selectSnackbarData);

  const updateSnackbar = useCallback(
    (updates: Snackbar) => {
      dispatch(save(updates));

      if (data && data.isOpen && data.openDurationMs) {
        setTimeout(() => {
          dispatch(save({ ...initialState }));
        }, data.openDurationMs);
      }
    },
    [data, dispatch],
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
    data,
    setMessage,
  };
};

export default useSnackbar;
