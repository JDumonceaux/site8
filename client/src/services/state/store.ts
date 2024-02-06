import { configureStore } from '@reduxjs/toolkit';

import artReducer from './artSlice';
import counterReducer from './examples/counterSlice';
import formExample1Slice from './examples/formExample1Slice';
import musicReducer from './musicSlice';
import photosReducer from './photosSlice';
import resourcesReducer from './resourcesSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    resources: resourcesReducer,
    art: artReducer,
    music: musicReducer,
    photos: photosReducer,
    form: formExample1Slice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
