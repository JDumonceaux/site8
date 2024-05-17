import { createSlice } from '@reduxjs/toolkit';
import { Snackbar } from 'services/types/Snackbar';

interface SnackbarState {
  data: Snackbar | null;
}

const initialState: SnackbarState = {
  data: null,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    save: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { save } = snackbarSlice.actions;
export default snackbarSlice.reducer;
