import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ServiceUrl } from '../../utils';
import { Music } from '../types/Music';

interface MusicState {
  musicData: Music | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MusicState = {
  musicData: null,
  isLoading: false,
  error: null,
};

export const fetchMusic = createAsyncThunk('music/fetchMusic', async () => {
  const response = await axios.get<Music>(ServiceUrl.ENDPOINT_MUSIC, {
    responseType: 'json',
  });
  return response.data;
});

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMusic.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMusic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.musicData = action.payload;
      })
      .addCase(fetchMusic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export default musicSlice.reducer;
