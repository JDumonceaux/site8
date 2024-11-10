import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ServiceUrl } from '../lib/utils/constants';
import { Images } from 'types';

type ImageState = {
  data: Images | null;
  error: null | string;
  isLoading: boolean;
};

const initialState: ImageState = {
  data: null,
  error: null,
  isLoading: false,
};
const controller = new AbortController();

const fetchImages = createAsyncThunk('image/fetchImages', async () => {
  const response = await axios.get<Images>(ServiceUrl.ENDPOINT_IMAGES_SCAN, {
    responseType: 'json',
    signal: controller.signal,
  });
  return response.data;
});

const ImageSlice = createSlice({
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
        state.error = action.error.message ?? 'Unable to fetch images';
      });
  },
  initialState,
  name: 'image',
  reducers: {},
});

export { fetchImages };
export default ImageSlice.reducer;
