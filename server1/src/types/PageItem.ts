import { Page } from './Page.js';
import { Parent } from './Parent.js';

export type PageItem = Omit<Page, 'parentItems'> & {
  readonly parentItem?: Parent;
  readonly issue?: boolean;
  readonly line: number;
};
