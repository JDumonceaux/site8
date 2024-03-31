import { createSlice } from '@reduxjs/toolkit';
import { Snackbar } from 'services/types/Snackbar';

interface SnackbarState {
  snackbarData: Snackbar | null;
}

const initialState: SnackbarState = {
  snackbarData: null,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    save: (state, action) => {
      state.snackbarData = action.payload;
    },
  },
});

export const { save } = snackbarSlice.actions;
export default snackbarSlice.reducer;
