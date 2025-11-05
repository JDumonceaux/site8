import type { Metadata } from './Metadata.js';
import type { Photo } from './Photo.js';
import type { PhotoSet } from './PhotoSet.js';

export type Photos = Metadata & {
  readonly metadata: Metadata;
  readonly items: Photo[];
  readonly sets: PhotoSet[];
};
