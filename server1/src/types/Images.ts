import { Image, ImageEdit } from './Image.js';
import { Metadata } from './Metadata.js';

export type Images = {
  readonly metadata: Metadata;
  readonly items: Image[] | undefined;
};

export type ImagesEdit = {
  readonly metadata: Metadata;
  readonly items: ImageEdit[] | undefined;
};
