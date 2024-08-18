import { Metadata } from './Metadata';
import { MusicItem } from './MusicItem';

export type Music = {
  readonly items: MusicItem[];
  readonly metadata: Metadata;
};
