import type { Artist } from './Artist';
import type { Metadata } from './Metadata';

export type Artists = {
  readonly items: Artist[] | undefined;
  readonly metadata: Metadata;
};
