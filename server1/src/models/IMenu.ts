import { IMenuItem } from './IMenuItem.js';

export interface IMenu {
  items: [
    {
      readonly parent: string;
      readonly items: IMenuItem[];
    },
  ];
}
