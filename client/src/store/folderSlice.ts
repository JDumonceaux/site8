import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ServiceUrl } from 'lib/utils/constants';

type FolderState = {
  data: null | string[];
  error: null | string;
  isLoading: boolean;
};

const initialState: FolderState = {
  data: null,
  error: null,
  isLoading: false,
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

const FolderSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.length > 0 ? action.payload : null;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unable to fetch folders';
      });
  },
  initialState,
  name: 'folder',
  reducers: {},
});

export default FolderSlice.reducer;
