import type { Parent } from './Parent.js';

export type MenuItem = {
  readonly id: number;
  readonly items?: MenuItem[];
  readonly parentItem?: Parent;
  readonly title: string;
  readonly type: 'root' | 'menu' | 'page';
  readonly url?: string | undefined;
};
