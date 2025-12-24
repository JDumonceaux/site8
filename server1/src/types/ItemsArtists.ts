import type { ItemArtist } from './ItemArtist.js';
import type { Metadata } from './Metadata.js';

export type ItemsArtists = {
  readonly items: ItemArtist[] | undefined;
  readonly metadata: Metadata;
};
