import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Snackbar } from 'types/Snackbar';

type SnackbarState = {
  data: Snackbar | null;
};

const initialState: SnackbarState = {
  data: null,
};

const SnackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<Snackbar>) => {
      state.data = action.payload;
    },
  },
});

export const { save } = SnackbarSlice.actions;
export default SnackbarSlice.reducer;
