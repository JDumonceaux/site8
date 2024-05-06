import { MenuItem } from './MenuItem.js';
import { Page } from './Page.js';

export type MenuEntry = {
  readonly id: number;
  readonly name: string;
  readonly seq: number;
  readonly parentId: number;
  readonly level: number;
  readonly type: 'menu' | 'page';
  readonly sortby: 'seq' | 'name';
  readonly pageItem?: Page;
  readonly menuItem?: MenuItem;
  readonly to?: string;
  readonly url?: string;
  items?: MenuEntry[];
};
