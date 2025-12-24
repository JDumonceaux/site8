import type { Artist } from './Artist.js';
import type { Item } from './Item.js';
import type { Metadata } from './Metadata.js';

export type ItemsFile = {
  readonly artists?: Artist[] | undefined;
  readonly items: Item[] | undefined;
  readonly metadata: Metadata;
};
