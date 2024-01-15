import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./examples/counterSlice";
import resourcesReducer from "./resourcesSlice";
import artReducer from "./artSlice";
import musicReducer from "./musicSlice";
import photosReducer from "./photosSlice";
import formExample1Slice from "./examples/formExample1Slice";

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
