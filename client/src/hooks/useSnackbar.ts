import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { save } from 'store/AppSlice';
import { AppDispatch, RootState } from 'store/store';
import { Snackbar } from 'types/Snackbar';

const initialState: Snackbar = {
  isOpen: false,
  openDurationMs: 0,
  contents: null,
};

/**
 * Custom hook for managing a snackbar.
 * @returns An object containing snackbar data, setMessage function, and closeSnackbar function.
 */
const useSnackbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data: Snackbar | null = useSelector(
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
    (contents: Snackbar['contents'], duration = 5000) => {
      updateSnackbar({
        isOpen: true,
        openDurationMs: duration,
        contents,
      });
    },
    [updateSnackbar],
  );

  const close = useCallback(() => {
    updateSnackbar(initialState);
  }, [updateSnackbar]);

  return {
    snackbarData: data,
    setMessage,
    closeSnackbar: close,
  };
};

export default useSnackbar;
