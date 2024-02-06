import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ServiceUrl } from '../../utils';
import { IPhotos } from '../api/models/photos/IPhotos';

interface PhotosState {
  photosData: IPhotos | null;
  loading: boolean;
  error: string | null;
}

const initialState: PhotosState = {
  photosData: null,
  loading: false,
  error: null,
};

export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async () => {
  const response = await axios.get<IPhotos>(ServiceUrl.ENDPOINT_PHOTOS, {
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
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photosData = action.payload;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default photosSlice.reducer;
