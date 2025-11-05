import type { Artist } from './Artist.js';
import type { Item } from './Item.js';

export type ItemArtist = {
  readonly artistId: number;
} & Item &
  Omit<Artist, 'id'>;
