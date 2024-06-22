import { Metadata } from './Metadata.js';
import { Test } from './Test.js';

export type Tests = {
  readonly metadata: Metadata;
  readonly items?: Test[];
};
