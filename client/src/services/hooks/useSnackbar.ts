import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../state/store';
import { Snackbar } from 'services/models/Snackbar';
import { save } from '../state/snackbarSlice';

const useSnackbar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selector = (state: RootState) => state.snackbar;
  const data: Snackbar | null = useSelector(selector).snackbarData;

  const updateSnackbarDispatch = useCallback(
    (data: Snackbar) => {
      dispatch(save(data));
    },
    [dispatch],
  );

  const setSimpleSnackbarMessage = useCallback(
    (contents: Snackbar['contents']) => {
      updateSnackbarDispatch({
        isOpen: true,
        openDurationMs: 5000,
        contents,
      });
    },
    [updateSnackbarDispatch],
  );

  const setSimpleSnackbarMessageNoCloseX = useCallback(
    (contents: Snackbar['contents']) => {
      updateSnackbarDispatch({
        showCloseButton: false,
        isOpen: true,
        openDurationMs: 5000,
        contents,
      });
    },
    [updateSnackbarDispatch],
  );

  const closeSnackbar = useCallback(() => {
    updateSnackbarDispatch({
      isOpen: false,
      contents: null,
    });
  }, [updateSnackbarDispatch]);

  return {
    snackbarData: data,
    setSimpleSnackbarMessage,
    setSimpleSnackbarMessageNoCloseX,
    closeSnackbar,
  };
};

export default useSnackbar;
