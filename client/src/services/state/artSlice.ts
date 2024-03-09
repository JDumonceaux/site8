import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ServiceUrl } from '../../utils';
import { Art } from '../types/Art';

interface ArtState {
  artData: Art | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ArtState = {
  artData: null,
  isLoading: false,
  error: null,
};

export const fetchArt = createAsyncThunk('art/fetchArt', async () => {
  const response = await axios.get<Art>(ServiceUrl.ENDPOINT_ART, {
    responseType: 'json',
  });
  return response.data;
});

const artSlice = createSlice({
  name: 'art',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArt.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.artData = action.payload;
      })
      .addCase(fetchArt.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export default artSlice.reducer;
