import { Menu } from './Menu.js';
import { Metadata } from './Metadata.js';

export type Menus = {
  readonly metadata: Metadata;
  readonly items?: Menu[];
};
