import { MenuItem } from './MenuItem';
import { Metadata } from './Metadata';

export type Menu = {
  readonly metadata: Metadata;
  readonly items?: MenuItem[];
};
