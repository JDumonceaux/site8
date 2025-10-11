import type { Artist } from './Artist';
import type { Item } from './Item';

export type ArtistWithtems = {
  readonly artist: Artist;
  readonly items?: Item[];
};
