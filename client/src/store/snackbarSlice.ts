import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Snackbar } from '../features/app/snackbar-temp/useSnackbar';
import type { RootState } from './store';

/** Shape of the `snackbar` slice state. */
type SnackbarState = {
  /** The current snackbar payload, or null if none is showing. */
  data: null | Snackbar;
};

/** Initial state: nothing showing. */
const initialState: SnackbarState = {
  data: null,
};

/**
 * Manages the global snackbar (toast) notification.
 */
const snackbarSlice = createSlice({
  initialState,
  name: 'snackbar',
  reducers: {
    /**
     * Hide/clear the current snackbar.
     * @param state Current slice state
     */
    hideSnackbar: (state) => {
      state.data = null;
    },
    /**
     * Show a new snackbar.
     * @param state Current slice state
     * @param action Payload must be a valid Snackbar
     */
    showSnackbar: (state, action: PayloadAction<Snackbar>) => {
      state.data = action.payload;
    },
  },
});

export const { hideSnackbar, showSnackbar } = snackbarSlice.actions;
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
