import { Metadata } from './Metadata';
import { Page } from './Page';

export type Pages = {
  readonly metadata: Metadata;
  readonly items: Page[];
};
