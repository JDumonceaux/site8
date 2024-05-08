import { MenuEntry } from './MenuEntry';
import { Metadata } from './Metadata';

export type Menu = {
  readonly metadata: Metadata;
  readonly items?: MenuEntry[];
};
