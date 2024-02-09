import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ICase } from '../../hooks/examples/ICase';

export interface IFormExample1State {
  caseNumber: string;
}

const initialState: IFormExample1State = {
  caseNumber: '',
};

const formExample1Slice = createSlice({
  name: 'formExample1',
  initialState,
  reducers: {
    update(state, action: PayloadAction<ICase>) {
      state = action.payload;
    },
    updateCaseNumber(state, action: PayloadAction<string>) {
      state = {
        caseNumber: action.payload,
      };
      console.log('updateCaseNumber', state);
    },
  },
});

export const { update, updateCaseNumber } = formExample1Slice.actions;

export default formExample1Slice.reducer;
