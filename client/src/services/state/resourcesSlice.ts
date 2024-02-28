import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ServiceUrl } from '../../utils';
import { Resources } from '../models/Resources';

interface ResourcesState {
  resourcesData: Resources | null;
  loading: boolean;
  error: string | null;
}

const initialState: ResourcesState = {
  resourcesData: null,
  loading: false,
  error: null,
};

export const fetchResources = createAsyncThunk(
  'resources/fetchResources',
  async () => {
    const response = await axios.get<Resources>(
      `${ServiceUrl.ENDPOINT_RESOURCES}/1`,
      {
        responseType: 'json',
      },
    );
    return response.data;
  },
);

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.loading = false;
        state.resourcesData = action.payload;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export default resourcesSlice.reducer;
