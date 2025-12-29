import type { PageMenu } from '@site8/shared';

export type PageText = PageMenu & {
  readonly text?: string;
};
