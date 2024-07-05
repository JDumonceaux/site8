import { ParentSortby } from './ParentSortby';

export type MenuAdd = {
  readonly id: number;
  readonly name: string;
  readonly to?: string;
  readonly url?: string;
  readonly type: 'root' | 'menu';
  readonly parentItems: ParentSortby[];
};
