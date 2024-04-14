import { Menu } from './Menu.js';
import { Metadata } from './Metadata.js';
import { Page } from './Page.js';

export type Pages = {
  readonly metadata: Metadata;
  readonly level1?: Menu[];
  readonly level2?: Menu[];
  readonly pages?: Page[];
};
