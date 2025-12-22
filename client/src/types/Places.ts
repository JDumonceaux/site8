import type { Metadata } from './Metadata';
import type { Place } from './Place';

export type Places = {
  readonly items: Place[];
  readonly metadata: Metadata;
};
