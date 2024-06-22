import { Metadata } from './Metadata';
import { Test } from './Test';

export type Tests = {
  readonly metadata: Metadata;
  readonly items?: Test[];
};
