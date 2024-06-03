import { Metadata } from './Metadata';
import { Page } from './Page';

export type Menu = {
  readonly metadata: Metadata;
  readonly items?: Page[];
  readonly tree?: Page[];
};
