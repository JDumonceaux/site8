import { MenuEntry } from './MenuEntry';
import { Metadata } from './Metadata';

export type Menu = Metadata & {
  readonly items?: MenuEntry[];
};
