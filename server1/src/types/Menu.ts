import { MenuItem } from './MenuItem.js';
import { Metadata } from './Metadata.js';

export type Menu = {
  readonly metadata: Metadata;
  readonly items?: MenuItem[];
};
