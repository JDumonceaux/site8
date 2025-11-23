import type { ArtItem } from './ArtItem';
import type { Metadata } from './Metadata';

export type Art = {
  readonly items: readonly ArtItem[];
  readonly metadata: Readonly<Metadata>;
};
