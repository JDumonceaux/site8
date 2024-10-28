import React from 'react';

export type ListItem = {
  readonly key: number;
  readonly value: string | number | string[] | undefined;
  readonly display?: React.ReactNode;
};
