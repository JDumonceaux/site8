import { MenuItem } from './MenuItem.js';
import { Page } from './Page.js';

export type MenuLevel = MenuItem & {
  readonly items?: MenuLevel[];
  readonly pages?: Page[];
};
