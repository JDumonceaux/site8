import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Snackbar } from 'features/app/useSnackbar';

/**
 * Represents the state structure for the snackbar.
 */
export type SnackbarState = {
  data: null | Snackbar;
};

const initialState: SnackbarState = {
  data: null,
};

/**
 * Snackbar slice for managing snackbar notifications.
 */
const snackbarSlice = createSlice({
  initialState,
  name: 'snackbar',
  reducers: {
    /**
     * Clears the snackbar data.
     * @param state - The current snackbar state.
     */
    clearSnackbar: (state) => {
      state.data = null;
    },
    /**
     * Sets the snackbar data.
     * @param state - The current snackbar state.
     * @param action - The action payload containing the snackbar.
     */
    setSnackbar: (state, action: PayloadAction<Snackbar>) => {
      state.data = action.payload;
    },
  },
});

export const { clearSnackbar, setSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
