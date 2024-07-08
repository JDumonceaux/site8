import { configureStore } from '@reduxjs/toolkit';

import appReducer from './appSlice';
import folderReducer from './folderSlice';
import imageReducer from './imageSlice';
import menuAbbrReducer from './menuAbbrSlice';
import menuReducer from './menuSlice';
import snackbarReducer from './snackbarSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    menuAbbr: menuAbbrReducer,
    snackbar: snackbarReducer,
    image: imageReducer,
    appSettings: appReducer,
    folders: folderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
