import { Metadata } from './Metadata.js';
import { PageMenu } from './PageMenu.js';

export type PagesIndex = {
  readonly metadata: Metadata;
  readonly items: PageMenu[];
};
