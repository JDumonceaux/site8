import type { ParentSortby } from './ParentSortby';

export type MenuEdit = {
  readonly id: number;
  readonly newParent: ParentSortby;
  readonly priorParent: ParentSortby;
};
