import { ParentSortby } from './ParentSortby';

// Returned to front end
export type MenuItem = {
  readonly id: number;
  readonly name: string;
  readonly to?: string;
  readonly url?: string;
  readonly toComplete?: string;
  readonly type: 'root' | 'menu' | 'page';
  readonly file?: boolean;
  readonly localId: number;
  readonly issue?: boolean;
  readonly parent: ParentSortby;
};
