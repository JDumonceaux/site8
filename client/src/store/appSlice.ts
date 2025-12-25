import type { AppSettings } from '@types';
import { createSimpleSlice } from './sliceFactory';

/**
 * Redux slice for application settings.
 * Manages global app configuration and state.
 */
const appSlice = createSimpleSlice<AppSettings | null>({
  initialData: null,
  name: 'app',
});

export default appSlice.reducer;
export const { save } = appSlice.actions;
