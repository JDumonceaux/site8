import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ServiceUrl } from '../../utils';
import { Bookmarks } from '../types/Bookmarks';

interface BookmarksState {
  bookmarksData: Bookmarks | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookmarksState = {
  bookmarksData: null,
  loading: false,
  error: null,
};

export const fetchBookmarks = createAsyncThunk(
  'bookmarks/fetchBookmarks',
  async () => {
    const response = await axios.get<Bookmarks>(
      `${ServiceUrl.ENDPOINT_BOOKMARKS}/1`,
      {
        responseType: 'json',
      },
    );
    return response.data;
  },
);

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarksData = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export default bookmarksSlice.reducer;
