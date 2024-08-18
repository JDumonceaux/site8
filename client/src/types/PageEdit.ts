import { ParentSortby } from './ParentSortby';

export type PageEdit = {
  readonly id: number;
  readonly name: string;
  readonly parentItems?: ParentSortby[];
  readonly readability_score?: string;
  readonly reading_time?: string;
  readonly text?: string;
  readonly to?: string;
  readonly toComplete?: string;
  readonly type: 'menu' | 'page' | 'root';
  readonly url?: string;
};
