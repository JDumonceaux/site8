import { ParentSortby } from './ParentSortby.js';

export type PageEdit = {
  readonly id: number;
  readonly name: string;
  readonly title?: string;
  readonly to?: string;
  readonly toComplete?: string;
  readonly url?: string;
  readonly text?: string;
  readonly edit_date?: Date;
  readonly create_date?: Date;
  readonly reading_time?: string;
  readonly readability_score?: string;
  readonly type: 'page';
  readonly parentItems: ParentSortby[];
  readonly file?: boolean;
};
