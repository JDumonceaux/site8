import { ParentSortby } from './ParentSortby';

export type PageEdit = {
  readonly id: number;
  readonly name: string;
  readonly to?: string;
  readonly url?: string;
  readonly text?: string;
  readonly reading_time?: string;
  readonly readability_score?: string;
  readonly type: 'root' | 'menu' | 'page';
  readonly toComplete?: string;
  readonly parentItems?: ParentSortby[];
};
