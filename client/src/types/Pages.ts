import type { Metadata } from './Metadata';
import type { Page } from './Page';

export type Pages = {
  readonly items?: Page[];
  readonly metadata: Metadata;
};
