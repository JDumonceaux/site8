import { Metadata } from './Metadata.js';
import { PageMenu } from './Page.js';

export type Pages = {
  readonly metadata: Metadata;
  readonly items: PageMenu[];
};
