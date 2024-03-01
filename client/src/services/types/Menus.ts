import { Menu } from './Menu';
import { Metadata } from './Metadata';

export type Menus = {
  readonly metadata: Metadata;
  items?: Menu[];
};
