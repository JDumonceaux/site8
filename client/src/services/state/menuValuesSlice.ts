import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ServiceUrl } from '../../utils';
import { MenuEntryFlat } from 'services/types/MenuEntryFlat';

interface MenuState {
  data: MenuEntryFlat[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  data: null,
  isLoading: false,
  error: null,
};

const controller = new AbortController();

export const fetchMenuValues = createAsyncThunk(
  'menu/fetchMenuValues',
  async () => {
    const response = await axios.get<MenuEntryFlat[]>(
      ServiceUrl.ENDPOINT_MENUS_VALUES,
      {
        responseType: 'json',
        signal: controller.signal,
      },
    );
    return response.data;
  },
);

const MenuValuesSlice = createSlice({
  name: 'values',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuValues.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenuValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchMenuValues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default MenuValuesSlice.reducer;
