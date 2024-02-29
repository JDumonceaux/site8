import { PageSummary } from './PageSummary.js';

export interface Menu {
  readonly id: number;
  readonly seq: number;
  readonly sort: string;
  readonly name: string;
  items: PageSummary[];
}
