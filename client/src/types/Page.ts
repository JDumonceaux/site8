import type { ParentSortby } from './ParentSortby';

export type Page = {
  readonly create_date?: Date;
  readonly edit_date?: Date;
  readonly id: number;
  readonly items?: Page[];
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
