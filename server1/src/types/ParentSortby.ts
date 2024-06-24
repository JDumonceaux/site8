import { Parent } from './Parent.js';

export type ParentSortby = Parent & {
  readonly sortby?: 'seq' | 'name' | undefined;
};
