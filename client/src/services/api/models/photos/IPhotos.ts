import { IMetadata } from '../IMetadata';
import { IPhoto } from './IPhoto';
import { IPhotoSet } from './IPhotoSet';

export interface IPhotos {
  readonly metadata: IMetadata;
  readonly items: IPhoto[];
  readonly sets: IPhotoSet[];
}
