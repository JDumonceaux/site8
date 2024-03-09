import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ServiceUrl } from '../../utils';
import { Photos } from '../types/Photos';

interface PhotosState {
  photosData: Photos | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PhotosState = {
  photosData: null,
  isLoading: false,
  error: null,
};

export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async () => {
  const response = await axios.get<Photos>(ServiceUrl.ENDPOINT_PHOTOS, {
    responseType: 'json',
  });
  return response.data;
});

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.photosData = action.payload;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export default photosSlice.reducer;
