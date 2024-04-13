import { PageSummary } from './PageSummary.js';

export type Menu = {
  readonly id: number;
  readonly sort: string;
  readonly seq: number;
  readonly name: string;
  readonly url: string;
  items?: Menu[];
  pages?: PageSummary[];
};
