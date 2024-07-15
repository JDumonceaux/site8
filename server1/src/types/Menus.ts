import { MenuItem } from './MenuItem.js';
import { Metadata } from './Metadata.js';

export type Menus = {
  readonly metadata: Metadata;
  readonly items?: MenuItem[];
};
