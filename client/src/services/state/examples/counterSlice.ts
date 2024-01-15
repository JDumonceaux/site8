import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: string;
}

const initialState: CounterState = {
  value: "",
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { increment } = counterSlice.actions;

export default counterSlice.reducer;
