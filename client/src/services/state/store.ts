import { configureStore } from '@reduxjs/toolkit';

import artReducer from './artSlice';
import counterReducer from './examples/counterSlice';
import menuReducer from './menuSlice';
import musicReducer from './musicSlice';
import photosReducer from './photosSlice';
import resourcesReducer from './resourcesSlice';
import snackbarReducer from './snackbarSlice';

export const store = configureStore({
  reducer: {
    art: artReducer,
    counter: counterReducer,
    menu: menuReducer,
    music: musicReducer,
    photos: photosReducer,
    resources: resourcesReducer,
    snackbar: snackbarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
