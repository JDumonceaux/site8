import { Menu } from './Menu.js';
import { Page } from './Page.js';

export interface Pages {
  readonly menus: Menu[];
  readonly items: Page[];
}
