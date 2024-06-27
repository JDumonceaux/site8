import { ParentSortby } from './ParentSortby.js';

export type PageEdit = {
  readonly id: number;
  readonly name: string;
  readonly to?: string;
  readonly url?: string;
  readonly text?: string;
  readonly edit_date?: Date;
  readonly create_date?: Date;
  readonly reading_time?: string;
  readonly readability_score?: string;
  readonly type: 'root' | 'menu' | 'page';
  readonly parentItems: ParentSortby[];
  readonly hasFile: boolean;
};
