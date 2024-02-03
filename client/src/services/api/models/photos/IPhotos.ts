import { IPhoto } from './IPhoto';
import { IPhotoSet } from './IPhotoSet';

export interface IPhotos {
  metadata: {
    id: number;
    data_type: string;
    title: string;
  };
  items: IPhoto[];
  sets: IPhotoSet[];
}
