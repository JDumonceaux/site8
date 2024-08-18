import { ArtItem } from './ArtItem';
import { Metadata } from './Metadata';

export type Art = {
  readonly items: ArtItem[];
  readonly metadata: Metadata;
};
