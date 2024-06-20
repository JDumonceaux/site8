import { ArtItem } from './ArtItem';
import { Metadata } from './Metadata';

export type Art = {
  readonly metadata: Metadata;
  readonly items: ArtItem[];
};
