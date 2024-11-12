import type { Metadata } from './Metadata';
import type { Photo } from './Photo';
import type { PhotoSet } from './PhotoSet';

export type Photos = {
  readonly items: Photo[];
  readonly metadata: Metadata;
  readonly sets: PhotoSet[];
};
