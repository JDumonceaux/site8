import { Menu } from './Menu';
import { Metadata } from './Metadata';
import { Page } from './Page';

export type Pages = {
  readonly metadata: Metadata;
  readonly menus?: Menu[];
  readonly pages?: Page[];
};
