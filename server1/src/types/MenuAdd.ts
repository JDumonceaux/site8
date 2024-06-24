import { ParentSortby } from './ParentSortby.js';

export type MenuAdd = {
  readonly id: number;
  readonly name: string;
  readonly to?: string;
  readonly url?: string;
  readonly type: 'root' | 'menu' | 'page';
  readonly parent: ParentSortby;
};
