import { createSlice } from '@reduxjs/toolkit';
import { ISnackbar } from 'services/api/models/snackbar/ISnackbar';

interface SnackbarState {
  snackbarData: ISnackbar | null;
}

const initialState: SnackbarState = {
  snackbarData: null,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    save: (state, action) => {
      state.snackbarData = action.payload.data;
    },
  },
});

export const { save } = snackbarSlice.actions;
export default snackbarSlice.reducer;
