import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ServiceUrl } from '../../utils';
import { Menus } from '../models/Menus';

interface MenuState {
  MenuData: Menus | null;
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  MenuData: null,
  loading: false,
  error: null,
};

export const fetchMenu = createAsyncThunk('Menu/fetchMenu', async () => {
  const response = await axios.get<Menus>(ServiceUrl.ENDPOINT_MENU, {
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
