import { Metadata } from './Metadata.js';
import { ItemArtist } from './ItemArtist.js';

export type ItemsArtists = {
  readonly metadata: Metadata;
  readonly items: ItemArtist[] | undefined;
};
