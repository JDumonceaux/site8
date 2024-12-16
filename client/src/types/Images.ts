import type { Image } from './Image';
import type { Metadata } from './Metadata';

export type Images = {
  readonly items: Image[];
  readonly metadata: Metadata;
};
