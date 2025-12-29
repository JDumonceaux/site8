import type { Parent } from '@site8/shared';

export type ParentSortby = {
  readonly sortby?: 'name' | 'seq' | undefined;
} & Parent;
