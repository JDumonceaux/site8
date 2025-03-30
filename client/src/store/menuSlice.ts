import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ServiceUrl } from 'lib/utils/constants';
import type { Menu } from 'types';

type MenuState = {
  data: Menu | null;
  error: null | string;
  isLoading: boolean;
};

const initialState: MenuState = {
  data: null,
  error: null,
  isLoading: false,
};

export const fetchMenu = createAsyncThunk<Menu>(
  'menu/fetchMenu',
  async (_, { signal }) => {
    const response = await axios.get<Menu>(ServiceUrl.ENDPOINT_MENUS, {
      responseType: 'json',
      signal,
    });
    return response.data;
  },
);

const menuSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unable to fetch menu';
      });
  },
  initialState,
  name: 'menu',
  reducers: {},
});

export default menuSlice.reducer;
