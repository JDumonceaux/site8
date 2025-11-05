import type { Metadata } from './Metadata.js';
import type { Test } from './Test.js';

export type Tests = {
  readonly metadata: Metadata;
  readonly items?: Test[];
};
