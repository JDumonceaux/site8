import { configureStore } from '@reduxjs/toolkit';

import appReducer from './AppSlice';
import folderReducer from './FolderSlice';
import imageReducer from './ImageSlice';
import menuReducer from './MenuSlice';
import snackbarReducer from './SnackbarSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
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
