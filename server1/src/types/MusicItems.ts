import type { Metadata } from './Metadata.js';
import type { MusicItem } from './MusicItem.js';

export type MusicItems = {
  readonly items: MusicItem[] | undefined;
  readonly metadata: Metadata;
};
