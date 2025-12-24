import type { Item } from './Item.js';
import type { Metadata } from './Metadata.js';

export type Items = {
  readonly items: Item[] | undefined;
  readonly metadata: Metadata;
};
