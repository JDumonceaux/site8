import {
  createSlice,
  type Draft,
  type PayloadAction,
  type Slice,
} from '@reduxjs/toolkit';

/**
 * Configuration options for creating a simple data slice
 */
type SimpleSliceConfig<T> = {
  /** Initial data value */
  readonly initialData: T;
  /** Name of the slice (used for action types) */
  readonly name: string;
};

/**
 * Shape of a simple slice state with a single data property
 */
type SimpleSliceState<T> = {
  data: T;
};

/**
 * Factory function to create Redux slices with a simple data structure.
 * Generates a slice with a single `data` property and a `save` action.
 *
 * @template T - The type of data stored in the slice
 * @param config - Configuration for the slice
 * @returns A Redux slice with save action and reducer
 *
 * @example
 * // Create a settings slice
 * const settingsSlice = createSimpleSlice({
 *   name: 'settings',
 *   initialData: null as Settings | null
 * });
 *
 * export const { save: saveSettings } = settingsSlice.actions;
 * export default settingsSlice.reducer;
 */
export const createSimpleSlice = <T>({
  initialData,
  name,
}: SimpleSliceConfig<T>): Slice<SimpleSliceState<T>> => {
  const initialState: SimpleSliceState<T> = {
    data: initialData,
  };

  return createSlice({
    initialState,
    name,
    reducers: {
      /**
       * Updates the slice data with the provided payload
       */
      save: (state, action: PayloadAction<T>) => {
        state.data = action.payload as Draft<T>;
      },
    },
  });
};
