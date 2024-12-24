import type { Artist } from './Artist.js';
import type { Item } from './Item.js';

export type ArtistItems = {
  readonly artist: Artist;
  readonly items?: Item[];
};
