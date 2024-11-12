import type { ParentSortby } from './ParentSortby';

// Returned to front end
export type MenuItem = {
  readonly file?: boolean;
  readonly id: number;
  readonly issue?: boolean;
  readonly localId: number;
  readonly name: string;
  readonly parentItem: ParentSortby;
  readonly to?: string;
  readonly toComplete?: string;
  readonly type: 'menu' | 'page' | 'root';
  readonly url?: string;
};
