import type { Metadata } from './Metadata';
import type { MusicItem } from './MusicItem';

export type Music = {
  readonly items: MusicItem[];
  readonly metadata: Metadata;
};
