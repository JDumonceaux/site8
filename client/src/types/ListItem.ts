import React from 'react';

export type ListItem = {
  readonly key: number | string;
  readonly value: string | number | string[] | undefined;
  readonly display?: React.ReactNode;
};
