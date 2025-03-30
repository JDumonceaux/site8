import { configureStore } from '@reduxjs/toolkit';

import appReducer from './appSlice';
import menuReducer from './menuSlice';
import snackbarReducer from './SnackbarSlice';

/**
 * The Redux store for the application.
 */
export const store = configureStore({
  reducer: {
    appSettings: appReducer,
    menu: menuReducer,
    snackbar: snackbarReducer,
  },
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Infer the `AppDispatch` type from the store's dispatch function
export type AppDispatch = typeof store.dispatch;

export default store;
