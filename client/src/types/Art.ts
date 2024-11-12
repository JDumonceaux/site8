import type { ArtItem } from './ArtItem';
import type { Metadata } from './Metadata';

export type Art = {
  readonly items: ArtItem[];
  readonly metadata: Metadata;
};
