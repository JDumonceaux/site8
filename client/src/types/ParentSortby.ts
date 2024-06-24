import { Parent } from './Parent';

export type ParentSortby = Parent & {
  readonly sortby?: 'seq' | 'name' | undefined;
};
