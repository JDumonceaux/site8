import type { Item } from './Item';
import type { ItemArtist } from './ItemArtist';
import type { Metadata } from './Metadata';

export type Items = {
  readonly artists: ItemArtist[];
  readonly items: Item[];
  readonly metadata: Metadata;
};
