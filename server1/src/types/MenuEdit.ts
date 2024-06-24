import { MenuItem } from './MenuItem.js';
import { ParentSortby } from './ParentSortby.js';

export type MenuEdit = Pick<MenuItem, 'id' | 'parent'> & {
  readonly newParent: ParentSortby;
};
