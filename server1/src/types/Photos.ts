import type { Metadata } from './Metadata.js';
import type { Photo } from './Photo.js';
import type { PhotoSet } from './PhotoSet.js';

export type Photos = {
  readonly items: Photo[];
  readonly metadata: Metadata;
  readonly sets: PhotoSet[];
};
