export interface IPhotoItem {
  id: number;
  url: string;
  name?: string;
  description?: string;
  channel?: string;
  albums?: number[];
  tags?: string[];
}
