import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServiceUrl } from "../../utils";
import axios from "axios";

import { IArt } from "../api/models/art/IArt";

interface ArtState {
  artData: IArt | null;
  loading: boolean;
  error: string | null;
}

const initialState: ArtState = {
  artData: null,
  loading: false,
  error: null,
};

export const fetchArt = createAsyncThunk("art/fetchArt", async () => {
  const response = await axios.get<IArt>(ServiceUrl.ENDPOINT_ART, {
    responseType: "json",
  });
  return response.data;
});

const artSlice = createSlice({
  name: "art",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArt.fulfilled, (state, action) => {
        state.loading = false;
        state.artData = action.payload;
      })
      .addCase(fetchArt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default artSlice.reducer;
