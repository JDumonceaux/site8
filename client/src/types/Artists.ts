import { Artist } from './Artist.js';
import { Metadata } from './Metadata.js';

export type Artists = {
  readonly metadata: Metadata;
  readonly items: Artist[] | undefined;
};
