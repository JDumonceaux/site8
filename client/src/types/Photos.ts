import { Metadata } from './Metadata';
import { Photo } from './Photo';
import { PhotoSet } from './PhotoSet';

export type Photos = {
  readonly metadata: Metadata;
  readonly items: Photo[];
  readonly sets: PhotoSet[];
};
