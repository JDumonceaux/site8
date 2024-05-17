import { configureStore } from '@reduxjs/toolkit';

import menuReducer from './menuSlice';
import valuesReducer from './menuValuesSlice';
import snackbarReducer from './snackbarSlice';
import appReducer from './appSlice';
import imageReducer from './imageSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    menuValues: valuesReducer,
    snackbar: snackbarReducer,
    image: imageReducer,
    appSettings: appReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
