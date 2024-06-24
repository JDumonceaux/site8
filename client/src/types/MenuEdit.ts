import { MenuItem } from './MenuItem';
import { ParentSortby } from './ParentSortby';

export type MenuEdit = Pick<MenuItem, 'id' | 'parent'> & {
  readonly newParent: ParentSortby;
};
