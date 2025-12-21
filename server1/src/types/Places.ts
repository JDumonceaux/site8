import type { Metadata } from './Metadata.js';
import type { Place } from './Place.js';

export type Places = {
  readonly items: Place[];
  readonly metadata: Metadata;
};
