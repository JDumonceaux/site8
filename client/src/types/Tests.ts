import type { Metadata } from './Metadata';
import type { Test } from './Test';

export type Tests = {
  readonly items?: Test[];
  readonly metadata: Metadata;
};
