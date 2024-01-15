import { IPhotoItem } from "./IPhotoItem";
import { IPhotoSet } from "./IPhotoSet";

export interface IPhotos {
  metadata: {
    id: number;
    data_type: string;
    title: string;
  };
  items: IPhotoItem[];
  sets: IPhotoSet[];
}
