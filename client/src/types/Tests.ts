import { Metadata } from './Metadata';
import { Test } from './Test';

export type Tests = {
  readonly items?: Test[];
  readonly metadata: Metadata;
};
