import { Metadata } from './Metadata';
import { Resource } from './Resource';

export type Resources = {
  readonly metadata: Metadata;
  readonly items: Resource[];
};
