import { MenuItem } from './MenuItem';
import { Page } from './Page';

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