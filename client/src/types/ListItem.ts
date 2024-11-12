import type React from 'react';

export type ListItem = {
  readonly display?: React.ReactNode;
  readonly key: number | string;
  readonly value: number | string | string[] | undefined;
};
