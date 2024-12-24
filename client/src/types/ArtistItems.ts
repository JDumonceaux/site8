import type { Artist } from './Artist';
import type { Item } from './Item';

export type ArtistItems = {
  readonly artist: Artist;
  readonly items?: Item[];
};
