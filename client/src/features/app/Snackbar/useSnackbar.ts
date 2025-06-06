import { SNACKBAR_DEFAULT_DURATION } from 'lib/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { showSnackbar, hideSnackbar } from 'store/snackbarSlice';
import type { AppDispatch, RootState } from 'store/store';

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
  showCloseButton: false,
  variant: SnackbarVariant.INFO,
};

const selectSnackbarData = (state: RootState) => state.snackbar.data;

export type UseSnackbarReturn = {
  closeSnackbar: () => void;
  data: null | Snackbar;
  setErrorMessage: (contents: Snackbar['contents'], duration?: number) => void;
  setMessage: (contents: Snackbar['contents'], duration?: number) => void;
};

const useSnackbar = (): UseSnackbarReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector<RootState, null | Snackbar>(selectSnackbarData);

  function updateSnackbar(updates: Snackbar) {
    dispatch(showSnackbar(updates));
    const duration = updates.openDurationMs ?? SNACKBAR_DEFAULT_DURATION;
    if (updates.isOpen && duration > 0) {
      setTimeout(() => {
        dispatch(showSnackbar(initialState));
      }, duration);
    }
  }

  function setErrorMessage(
    contents: Snackbar['contents'],
    openDurationMs = SNACKBAR_DEFAULT_DURATION,
  ) {
    updateSnackbar({
      ...initialState,
      contents,
      isOpen: true,
      openDurationMs,
      showCloseButton: true,
      variant: SnackbarVariant.ERROR,
    });
  }

  function setMessage(
    contents: Snackbar['contents'],
    openDurationMs = SNACKBAR_DEFAULT_DURATION,
  ) {
    updateSnackbar({
      ...initialState,
      contents,
      isOpen: true,
      openDurationMs,
      showCloseButton: true,
      variant: SnackbarVariant.INFO,
    });
  }

  function closeSnackbar() {
    dispatch(hideSnackbar());
  }

  return {
    closeSnackbar,
    data,
    setErrorMessage,
    setMessage,
  };
};

export default useSnackbar;
