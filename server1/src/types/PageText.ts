import { Page } from './Page.js';
import { ParentSortby } from './ParentSortby.js';

export type PageText = {
  readonly id: number;
  readonly name: string;
  readonly to?: string;
  readonly url?: string;
  readonly text?: string;
  readonly edit_date?: Date;
  readonly create_date?: Date;
  readonly file?: boolean;
  readonly reading_time?: string;
  readonly readability_score?: string;
  readonly type: 'root' | 'menu' | 'page';
  readonly items?: Page[];
  readonly parentItems?: ParentSortby[];
  readonly hasFile: boolean;
};
