import { PageSummary } from './PageSummary.js';

export interface Menu {
  readonly id: number;
  readonly name: string;
  readonly seq: number;
  readonly sort: string;
  readonly url: string;
  items: PageSummary[];
}
