import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ServiceUrl } from '../../utils';
import { Images } from 'types';

interface ImageState {
  data: Images | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ImageState = {
  data: null,
  isLoading: false,
  error: null,
};

const controller = new AbortController();

export const fetchImages = createAsyncThunk('image/fetchImages', async () => {
  const response = await axios.get<Images>(ServiceUrl.ENDPOINT_IMAGES_SCAN, {
    responseType: 'json',
    signal: controller.signal,
  });
  return response.data;
});

const ImageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default ImageSlice.reducer;
