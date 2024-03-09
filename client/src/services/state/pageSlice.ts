import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ServiceUrl } from '../../utils';
import { Page } from '../types/Page';

interface PageState {
  PageData: Page | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PageState = {
  PageData: null,
  isLoading: false,
  error: null,
};

export const fetchPage = createAsyncThunk('page/fetchPage', async () => {
  const response = await axios.get<Page>(ServiceUrl.ENDPOINT_PAGE, {
    responseType: 'json',
  });
  return response.data;
});

const PageSlice = createSlice({
  name: 'Page',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.PageData = action.payload;
      })
      .addCase(fetchPage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export default PageSlice.reducer;
