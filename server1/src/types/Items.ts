import type { Item } from './Item.js';
import type { Metadata } from './Metadata.js';

export type Items = {
  readonly metadata: Metadata;
  readonly items: Item[] | undefined;
};
