import { Item } from './Item.js';
import { ItemArtist } from './ItemArtist.js';
import { Metadata } from './Metadata.js';

export type Items = {
  readonly metadata: Metadata;
  readonly artists: ItemArtist[] | undefined;
  readonly items: Item[] | undefined;
};
