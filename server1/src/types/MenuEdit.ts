import { ParentSortby } from './ParentSortby.js';

export type MenuEdit = {
  readonly id: number;
  readonly priorParent: ParentSortby;
  readonly newParent: ParentSortby;
};
