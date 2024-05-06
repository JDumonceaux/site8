import { MenuItem } from './MenuItem';
import { Page } from './Page';

export type MenuLevel = MenuItem & {
  readonly items?: MenuLevel[];
  readonly pages?: Page[];
};
