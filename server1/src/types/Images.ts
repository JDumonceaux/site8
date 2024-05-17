import { Image } from './Image.js';
import { Metadata } from './Metadata.js';

export type Images = {
  readonly metadata: Metadata;
  readonly items: Image[] | undefined;
};
