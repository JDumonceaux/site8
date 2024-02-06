import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ServiceUrl } from '../../utils';
import { IMusic } from '../api/models/music/IMusic';

interface MusicState {
  musicData: IMusic | null;
  loading: boolean;
  error: string | null;
}

const initialState: MusicState = {
  musicData: null,
  loading: false,
  error: null,
};

export const fetchMusic = createAsyncThunk('music/fetchMusic', async () => {
  const response = await axios.get<IMusic>(ServiceUrl.ENDPOINT_MUSIC, {
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
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMusic.fulfilled, (state, action) => {
        state.loading = false;
        state.musicData = action.payload;
      })
      .addCase(fetchMusic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default musicSlice.reducer;
