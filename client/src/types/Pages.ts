import { Metadata } from './Metadata';
import { Page } from './Page';

export type Pages = {
  readonly items?: Page[];
  readonly metadata: Metadata;
};
