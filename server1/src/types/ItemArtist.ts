import { Artist } from './Artist.js';
import { Item } from './Item.js';

export type ItemArtist = {
  readonly artistId: number;
} & Item &
  Omit<Artist, 'id'>;
