import type { Artist } from './Artist.js';
import type { Item } from './Item.js';

export type ArtistWithItems = {
  readonly artist: Artist;
  readonly items: Item[];
};
