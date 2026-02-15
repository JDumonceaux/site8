import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Snackbar } from '@app/snackbar/useSnackbar';
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

/** Manages the global snackbar (toast) notification. */
const snackbarSlice = createSlice({
  initialState,
  name: 'snackbar',
  reducers: {
    /**
     * Set or clear the snackbar.
     * @param state Current slice state
     * @param action Payload is null to hide, or a Snackbar to show
     */
    setSnackbar: (state, action: PayloadAction<null | Snackbar>) => {
      state.data = action.payload;
    },
  },
});

export const { setSnackbar } = snackbarSlice.actions;

/** Convenience action creator to show a snackbar */
export const showSnackbar = (snackbar: Snackbar) => setSnackbar(snackbar);

/** Convenience action creator to hide the snackbar */
export const hideSnackbar = () => setSnackbar(null);

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
