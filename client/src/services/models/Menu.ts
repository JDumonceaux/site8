import { MenuItem } from './MenuItem';

export type Menu = {
  items: [
    {
      readonly parent: string;
      readonly items: MenuItem[];
    },
  ];
};
