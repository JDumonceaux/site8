import type { Image, ImageEdit } from './Image.js';
import type { Metadata } from './Metadata.js';

export type Images = {
  readonly items: Image[] | undefined;
  readonly metadata: Metadata;
};

export type ImagesEdit = {
  readonly items: ImageEdit[] | undefined;
  readonly metadata: Metadata;
};
