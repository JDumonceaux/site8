import type { Metadata } from './Metadata.js';
import type { PageMenu } from './PageMenu.js';

export type Pages = {
  readonly metadata: Metadata;
  readonly items: PageMenu[];
};
