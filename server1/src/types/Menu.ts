import { Metadata } from './Metadata.js';
import { Page } from './Page.js';

export type Menu = {
  readonly metadata: Metadata;
  readonly items?: Page[];
  readonly tree?: Page[];
};
