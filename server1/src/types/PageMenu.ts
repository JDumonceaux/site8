import { Page } from './Page.js';

export type PageMenu = {
  readonly type: 'page' | 'root' | 'menu';
} & Omit<Page, 'type'>;
