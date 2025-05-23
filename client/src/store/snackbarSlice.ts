import {
  createSlice,
  type PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { Snackbar } from 'features/app/useSnackbar';

/** Shape of the `snackbar` slice state. */
type SnackbarState = {
  /** The current snackbar payload, or null if none is showing. */
  data: Snackbar | null;
};

/** Initial state: nothing showing. */
const initialState: SnackbarState = {
  data: null,
};

/**
 * Manages the global snackbar (toast) notification.
 */
const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    /**
     * Show a new snackbar.
     * @param state Current slice state
     * @param action Payload must be a valid Snackbar
     */
    showSnackbar(state, action: PayloadAction<Snackbar>) {
      state.data = action.payload;
    },
    /**
     * Hide/clear the current snackbar.
     * @param state Current slice state
     */
    hideSnackbar(state) {
      state.data = null;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;

/** Root selector — returns the entire slice. */
const selectSnackbarSlice = (state: RootState) => state.snackbar;

/** Returns the current snackbar payload (or null). */
export const selectSnackbarData = createSelector(
  selectSnackbarSlice,
  (slice: SnackbarState) => slice.data,
);

/** Returns true if a snackbar is currently visible. */
export const selectIsSnackbarVisible = createSelector(
  selectSnackbarData,
  (data) => data !== null,
);
