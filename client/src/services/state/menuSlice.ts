import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ServiceUrl } from '../../utils';
import { Menu } from '../models/Menu';

interface MenuState {
  MenuData: Menu | null;
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  MenuData: null,
  loading: false,
  error: null,
};

export const fetchMenu = createAsyncThunk('Menu/fetchMenu', async () => {
  const response = await axios.get<Menu>(ServiceUrl.ENDPOINT_MENU, {
    responseType: 'json',
  });
  return response.data;
});

const MenuSlice = createSlice({
  name: 'Menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.MenuData = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default MenuSlice.reducer;
