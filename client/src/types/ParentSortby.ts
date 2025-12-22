import type { Parent } from './Parent';

export type ParentSortby = {
  readonly sortby?: 'name' | 'seq' | undefined;
} & Parent;
