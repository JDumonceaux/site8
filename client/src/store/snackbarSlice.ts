import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Snackbar } from 'types/Snackbar';

type SnackbarState = {
  data: null | Snackbar;
};

const initialState: SnackbarState = {
  data: null,
};

const SnackbarSlice = createSlice({
  initialState,
  name: 'snackbar',
  reducers: {
    save: (state, action: PayloadAction<Snackbar>) => {
      state.data = action.payload;
    },
  },
});

export const { save } = SnackbarSlice.actions;
export default SnackbarSlice.reducer;
