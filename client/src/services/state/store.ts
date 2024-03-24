import { configureStore } from '@reduxjs/toolkit';

import artReducer from './artSlice';
import menuReducer from './menuSlice';
import musicReducer from './musicSlice';
import photosReducer from './photosSlice';
import snackbarReducer from './snackbarSlice';

export const store = configureStore({
  reducer: {
    art: artReducer,
    menu: menuReducer,
    music: musicReducer,
    photos: photosReducer,
    snackbar: snackbarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
