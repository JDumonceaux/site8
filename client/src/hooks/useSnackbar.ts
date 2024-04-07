import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../services/state/store';
import { Snackbar } from 'services/types/Snackbar';
import { save } from '../services/state/snackbarSlice';

const useSnackbar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selector = (state: RootState) => state.snackbar;
  const data: Snackbar | null = useSelector(selector).snackbarData;

  const initialState: Snackbar = useMemo(
    () => ({
      isOpen: false,
      openDurationMs: 0,
      contents: null,
    }),
    [],
  );

  const updateSnackbarDispatch = useCallback(
    (data: Snackbar) => {
      dispatch(save(data));
    },
    [dispatch],
  );

  const updateSnackbar = useCallback(
    (data: Snackbar) => {
      if (data.isOpen && data.openDurationMs) {
        setTimeout(() => {
          updateSnackbarDispatch(initialState);
        }, data.openDurationMs);
      }

      updateSnackbarDispatch(data);
    },
    [updateSnackbarDispatch, initialState],
  );

  const setSnackbarMessage = useCallback(
    (contents: Snackbar['contents']) => {
      updateSnackbar({
        isOpen: true,
        openDurationMs: 5000,
        contents,
      });
    },
    [updateSnackbar],
  );

  const closeSnackbar = () => {
    updateSnackbarDispatch({
      isOpen: false,
      contents: null,
    });
  };

  return {
    snackbarData: data,
    setSnackbarMessage,
    closeSnackbar,
  };
};

export default useSnackbar;
