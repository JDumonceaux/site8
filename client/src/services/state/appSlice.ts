import { createSlice } from '@reduxjs/toolkit';

import { AppSettings } from 'services/types';

interface AppState {
  data: AppSettings | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AppState = {
  data: null,
  isLoading: false,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    save: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { save } = appSlice.actions;
export default appSlice.reducer;
