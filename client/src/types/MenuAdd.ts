import { ParentSortby } from './ParentSortby';

export type MenuAdd = {
  readonly id: number;
  readonly name: string;
  readonly parentItems: ParentSortby[];
  readonly to?: string;
  readonly type: 'menu' | 'root';
  readonly url?: string;
};
