import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ServiceUrl } from '../../utils';
import { IPage } from '../api/models/pages/IPage';

interface PageState {
  PageData: IPage | null;
  loading: boolean;
  error: string | null;
}

const initialState: PageState = {
  PageData: null,
  loading: false,
  error: null,
};

export const fetchPage = createAsyncThunk('page/fetchPage', async () => {
  const response = await axios.get<IPage>(ServiceUrl.ENDPOINT_PAGE, {
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
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPage.fulfilled, (state, action) => {
        state.loading = false;
        state.PageData = action.payload;
      })
      .addCase(fetchPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

//export const {} = PageSlice.actions;

export default PageSlice.reducer;
