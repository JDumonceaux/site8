import { Menu } from './Menu';
import { Metadata } from './Metadata';
import { Page } from './Page';

export type Pages = {
  readonly metadata: Metadata;
  readonly level1?: Menu[];
  readonly level2?: Menu[];
  readonly pages?: Page[];
};
