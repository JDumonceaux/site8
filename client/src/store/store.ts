import { configureStore } from '@reduxjs/toolkit';

import { appReducer } from './appSlice';
import { snackbarReducer } from './snackbarSlice';

/**
 * The Redux store for the application.
 */
const store = configureStore({
  reducer: {
    appSettings: appReducer,
    snackbar: snackbarReducer,
  },
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Infer the `AppDispatch` type from the store's dispatch function
export type AppDispatch = typeof store.dispatch;

export default store;
