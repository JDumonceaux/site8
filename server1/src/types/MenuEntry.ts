import { MenuItem } from './MenuItem.js';
import { Page } from './Page.js';

// Returned to front end
export type MenuEntry = {
  readonly id: number;
  readonly name: string;
  readonly parentId: number;
  readonly seq: number;
  readonly type: 'menu' | 'page';
  readonly sortby: 'seq' | 'name';
  readonly item?: Page | MenuItem;
  readonly to?: string;
  readonly toComplete?: string;
  readonly url?: string;
  readonly menuItems: MenuEntry[];
  readonly pageItems: MenuEntry[];
  readonly items?: MenuEntry[];
  readonly parent: { id?: number; seq?: number }[];
};
