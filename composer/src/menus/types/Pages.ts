import { Menu } from './Menu.js';
import { Metadata } from './Metadata.js';
import { Page } from './Page.js';

export type Pages = {
  readonly metadata: Metadata;
  readonly menus: Menu[];
  readonly items: Page[];
};
