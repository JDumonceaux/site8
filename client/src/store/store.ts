import { configureStore } from '@reduxjs/toolkit';

import appReducer from './AppSlice';
import menuReducer from './MenuSlice';
import snackbarReducer from './SnackbarSlice';

const Store = configureStore({
  reducer: {
    appSettings: appReducer,
    menu: menuReducer,
    snackbar: snackbarReducer,
  },
});

export default Store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;
