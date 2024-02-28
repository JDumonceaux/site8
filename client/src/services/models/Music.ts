import { Metadata } from './Metadata';
import { MusicItem } from './MusicItem';

export type Music = {
  readonly metadata: Metadata;
  readonly items: MusicItem[];
};
