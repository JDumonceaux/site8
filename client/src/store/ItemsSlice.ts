import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ServiceUrl } from 'lib/utils/constants';
import type { Items } from 'types';

type ItemsState = {
  data: Items | null;
  error: null | string;
  isLoading: boolean;
};

const initialState: ItemsState = {
  data: null,
  error: null,
  isLoading: false,
};

const abortController = new AbortController();

const ItemsSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unable to fetch items';
      });
  },
  initialState,
  name: 'items',
  reducers: {
    getItems: (state, action) => {
      state.data = action.payload;
    },
  },
});

const fetchItems = createAsyncThunk('image/fetchItems', async () => {
  const response = await axios.get<Items>(ServiceUrl.ENDPOINT_ITEMS, {
    responseType: 'json',
    signal: abortController.signal,
  });
  return response.data;
});

export { fetchItems };
export default ItemsSlice.reducer;
