import { Metadata } from './Metadata.js';
import { PageMenu } from './Page.js';

export type PagesIndex = {
  readonly metadata: Metadata;
  readonly items: PageMenu[];
};
