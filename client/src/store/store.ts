import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';

import snackbarReducer from './snackbarSlice';
import appReducer from './appSlice';

/**
 * Configure the Redux store with:
 * - Serializability & immutability checks in middleware
 * - Redux DevTools enabled only in development
 * - (Optional) preloadedState, enhancers, or listener middleware
 */
export const store = configureStore({
  reducer: {
    appSettings: appReducer,
    snackbar: snackbarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
      immutableCheck: true,
    }),
  devTools: process.env.NODE_ENV !== 'production',
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
