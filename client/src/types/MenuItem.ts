import type { Parent } from './Parent';

export type MenuItem = {
  readonly id: number;
  readonly items?: MenuItem[];
  readonly parentItem?: Parent;
  readonly title: string;
  readonly type: 'menu' | 'page' | 'root';
  readonly url?: string | undefined;
};
