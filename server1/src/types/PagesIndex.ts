import { Metadata } from './Metadata.js';
import { PageIndex } from './PageIndex.js';

export type PagesIndex = {
  readonly metadata: Metadata;
  readonly items: PageIndex[];
};
