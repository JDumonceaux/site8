import { Item } from './Item.js';
import { Artist } from './Artist.js';
import { Metadata } from './Metadata.js';

export type ItemsFile = {
  readonly metadata: Metadata;
  readonly artists?: Artist[] | undefined;
  readonly items: Item[] | undefined;
};
