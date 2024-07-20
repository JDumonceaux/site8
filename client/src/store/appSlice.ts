import { createSlice } from '@reduxjs/toolkit';

import { AppSettings } from 'types';

type AppState = {
  data: AppSettings | null;
};

const initialState: AppState = {
  data: null,
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
