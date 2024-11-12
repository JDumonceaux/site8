import type { MenuItem } from './MenuItem';
import type { Metadata } from './Metadata';

export type Menu = {
  readonly items?: MenuItem[];
  readonly metadata: Metadata;
};
