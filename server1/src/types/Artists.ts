import type { Artist } from './Artist.js';
import type { Metadata } from './Metadata.js';

export type Artists = {
  readonly metadata: Metadata;
  readonly items: Artist[] | undefined;
};
