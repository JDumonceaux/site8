import { Page } from './Page.js';

export type Pages = {
  readonly menu: {
    readonly items: {
      readonly id: number;
      readonly seq: number;
      readonly sort: string;
      readonly name: string;
    }[];
  };
  readonly items: Page[];
};
