import { MenuItem } from './MenuItem.js';
import { Metadata } from './Metadata.js';
import { Page } from './Page.js';

export type Pages = {
  readonly metadata: Metadata;
  readonly menuItems?: MenuItem[];
  readonly pages?: Page[];
};
