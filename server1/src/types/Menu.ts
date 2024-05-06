import { MenuEntry } from './MenuEntry.js';
import { Metadata } from './Metadata.js';

export type Menu = {
  readonly metadata: Metadata;
  readonly items?: MenuEntry[];
};
