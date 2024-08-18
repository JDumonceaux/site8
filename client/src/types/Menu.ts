import { MenuItem } from './MenuItem';
import { Metadata } from './Metadata';

export type Menu = {
  readonly items?: MenuItem[];
  readonly metadata: Metadata;
};
