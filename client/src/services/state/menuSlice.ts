import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ServiceUrl } from '../../utils';
import { Menu } from 'types';

interface MenuState {
  data: Menu | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  data: null,
  isLoading: false,
  error: null,
};

const controller = new AbortController();

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
  const response = await axios.get<Menu>(ServiceUrl.ENDPOINT_MENUS, {
    responseType: 'json',
    signal: controller.signal,
  });
  return response.data;
});

const MenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
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
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default MenuSlice.reducer;
