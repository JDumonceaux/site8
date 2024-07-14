import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ServiceUrl } from '../utils';

interface FolderState {
  data: string[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: FolderState = {
  data: null,
  isLoading: false,
  error: null,
};

const controller = new AbortController();

export const fetchFolders = createAsyncThunk('image/fetchFolders', async () => {
  const response = await axios.get<string[]>(
    ServiceUrl.ENDPOINT_IMAGES_FOLDERS,
    {
      responseType: 'json',
      signal: controller.signal,
    },
  );
  return response.data;
});

const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload && action.payload.length > 0 ? action.payload : null;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default folderSlice.reducer;
