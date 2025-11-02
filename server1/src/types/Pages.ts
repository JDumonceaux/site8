import { Metadata } from './Metadata.js';
import { PageMenu } from './PageMenu.js';

export type Pages = {
  readonly metadata: Metadata;
  readonly items: PageMenu[];
};
