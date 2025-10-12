import type { Artist } from './Artist';
import type { Item } from './Item';

export type ArtistWithItems = {
  readonly artist: Artist;
  readonly items?: Item[];
};
