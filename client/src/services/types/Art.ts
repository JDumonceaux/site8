import { Metadata } from './Metadata';
import { ArtItem } from './ArtItem';

export type Art = {
  readonly metadata: Metadata;
  readonly items: ArtItem[];
};
