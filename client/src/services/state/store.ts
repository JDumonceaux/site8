import { configureStore } from '@reduxjs/toolkit';

import menuReducer from './menuSlice';

import snackbarReducer from './snackbarSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    snackbar: snackbarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
