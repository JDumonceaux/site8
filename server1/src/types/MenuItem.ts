import { ParentSortby } from './ParentSortby.js';

export type MenuItem = {
  readonly id: number;
  readonly name: string;
  readonly to?: string;
  readonly url?: string;
  readonly toComplete?: string;
  readonly type: 'root' | 'menu' | 'page';
  readonly file?: boolean;
  readonly line: number;
  readonly issue?: boolean;
  readonly parent: ParentSortby;
};
