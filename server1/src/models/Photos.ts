import { Metadata } from './Metadata.js';
import { Photo } from './Photo.js';
import { PhotoSet } from './PhotoSet.js';

export interface Photos {
  readonly metadata: Metadata;
  readonly items: Photo[];
  readonly sets: PhotoSet[];
}
