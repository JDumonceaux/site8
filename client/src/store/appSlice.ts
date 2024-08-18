import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';
import { AppSettings } from 'types';

type AppState = {
  data: AppSettings | null;
};

const initialState: AppState = {
  data: null,
};

const AppSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    save: (state, action: PayloadAction<AppSettings>) => {
      state.data = action.payload;
    },
  },
});

export const { save } = AppSlice.actions;
export default AppSlice.reducer;
