import { Parent } from './Parent.js';

export type PageMenu = {
  readonly id: number;
  readonly name: string;
  readonly title?: string;
  readonly to?: string;
  readonly toComplete?: string;
  readonly url?: string;
  readonly edit_date?: Date;
  readonly create_date?: Date;
  readonly reading_time?: string;
  readonly readability_score?: string;
  readonly parentItems?: Parent[];
  readonly file?: boolean;
  readonly type: 'page' | 'root' | 'menu';
};
