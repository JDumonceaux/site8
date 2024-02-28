import { Metadata } from './Metadata';
import { TestGridItem } from './TestGridItem';

export type TestItem = {
  readonly metadata: Metadata;
  readonly items: TestGridItem[];
};
