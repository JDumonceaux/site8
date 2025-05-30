import { ParentSortby } from './ParentSortby.js';

export type MenuAdd = {
  readonly id: number;
  readonly title: string;
  readonly to?: string;
  readonly url?: string;
  readonly type: 'root' | 'menu';
  readonly parentItems: ParentSortby[];
};
