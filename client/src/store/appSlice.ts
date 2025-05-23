import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppSettings } from 'types';

/**
 * The application state interface.
 */
type AppState = {
  data: AppSettings | null;
};

const initialState: AppState = {
  data: null,
};

const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    /**
     * Updates the application settings with the provided payload.
     * @param state - The current state.
     * @param action - The action payload containing new settings.
     */
    save: (state, action: PayloadAction<AppSettings>) => {
      state.data = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { save } = appSlice.actions;
