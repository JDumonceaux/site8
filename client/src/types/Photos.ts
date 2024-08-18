import { Metadata } from './Metadata';
import { Photo } from './Photo';
import { PhotoSet } from './PhotoSet';

export type Photos = {
  readonly items: Photo[];
  readonly metadata: Metadata;
  readonly sets: PhotoSet[];
};
