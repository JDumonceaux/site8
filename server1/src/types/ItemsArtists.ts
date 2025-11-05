import type { ItemArtist } from './ItemArtist.js';
import type { Metadata } from './Metadata.js';

export type ItemsArtists = {
  readonly metadata: Metadata;
  readonly items: ItemArtist[] | undefined;
};
