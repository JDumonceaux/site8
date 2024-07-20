import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { MenuAbbr } from 'types/MenuAbbr';
import { ServiceUrl } from 'utils/constants';

interface MenuState {
  data: MenuAbbr[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  data: null,
  isLoading: false,
  error: null,
};

const controller = new AbortController();

export const fetchMenuAbbr = createAsyncThunk(
  'menu/fetchMenuAbbr',
  async () => {
    const response = await axios.get<MenuAbbr[]>(
      ServiceUrl.ENDPOINT_MENUS_ABBR,
      {
        responseType: 'json',
        signal: controller.signal,
      },
    );
    return response.data;
  },
);

const MenuAbbrSlice = createSlice({
  name: 'menuAbbr',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuAbbr.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenuAbbr.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchMenuAbbr.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default MenuAbbrSlice.reducer;
