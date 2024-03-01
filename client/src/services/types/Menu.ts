import { PageSummary } from './PageSummary';

export type Menu = {
  readonly id: number;
  readonly seq: number;
  readonly sort: string;
  readonly name: string;
  items: PageSummary[];
  readonly url: string;
};
