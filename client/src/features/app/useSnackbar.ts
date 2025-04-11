import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from 'store/snackbarSlice';
import type { AppDispatch, RootState } from 'store/store';

const DEFAULT_DURATION = 500;

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

const useSnackbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data: null | Snackbar = useSelector(selectSnackbarData);

  const updateSnackbar = useCallback(
    (updates: Snackbar) => {
      dispatch(setSnackbar(updates));

      if (data && data.isOpen && data.openDurationMs) {
        setTimeout(() => {
          dispatch(setSnackbar({ ...initialState }));
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
        showCloseButton: true,
        variant: SnackbarVariant.INFO,
      });
    },
    [updateSnackbar],
  );

  const setErrorMessage = useCallback(
    (contents: Snackbar['contents'], duration = DEFAULT_DURATION) => {
      updateSnackbar({
        contents,
        isOpen: true,
        openDurationMs: duration,
        showCloseButton: true,
        variant: SnackbarVariant.ERROR,
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
    setErrorMessage,
    setMessage,
  };
};

export default useSnackbar;
