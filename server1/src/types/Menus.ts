import type { MenuItem } from './MenuItem.js';
import type { Metadata } from './Metadata.js';

export type Menus = {
  readonly items?: MenuItem[];
  readonly metadata: Metadata;
};
