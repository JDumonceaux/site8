import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServiceUrl } from "../../utils";
import axios from "axios";

import { IResources } from "../api/models/resources/IResources";

interface ResourcesState {
  resourcesData: IResources | null;
  loading: boolean;
  error: string | null;
}

const initialState: ResourcesState = {
  resourcesData: null,
  loading: false,
  error: null,
};

export const fetchResources = createAsyncThunk(
  "resources/fetchResources",
  async () => {
    const response = await axios.get<IResources>(
      `${ServiceUrl.ENDPOINT_RESOURCES}/1`,
      {
        responseType: "json",
      }
    );
    return response.data;
  }
);

const resourcesSlice = createSlice({
  name: "resources",
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
        state.error = action.error.message || "An error occurred";
      });
  },
});

//export const {} = resourcesSlice.actions;

export default resourcesSlice.reducer;
