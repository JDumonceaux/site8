import { Item } from './Item.js';
import { Metadata } from './Metadata.js';

export type Items = {
  readonly metadata: Metadata;
  readonly items: Item[] | undefined;
};
