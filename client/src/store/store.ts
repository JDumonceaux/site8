import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import snackbarReducer from './snackbarSlice';

/**
 * Configure the Redux store with:
 * - Serializability & immutability checks in middleware
 * - Redux DevTools enabled only in development
 * - (Optional) preloadedState, enhancers, or listener middleware
 */
export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: true,
    }),
  reducer: {
    appSettings: appReducer,
    snackbar: snackbarReducer,
  },
});

/** Infer the RootState type from the store itself */
export type RootState = ReturnType<typeof store.getState>;

/** Infer the AppDispatch type from the store's dispatch function */
export type AppDispatch = typeof store.dispatch;

/**
 * Typed hooks for use throughout your app:
 * - useAppDispatch(): dispatch actions with correct type
 * - useAppSelector(): select state with correct typing
 */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
