import { Parent } from './Parent.js';

export type MenuIndex = {
  readonly id: number;
  readonly name: string;
  readonly parentItems?: Parent[];
  readonly sortBy?: string;
  readonly to?: string;
  readonly url?: string;
  readonly toComplete?: string;
  readonly type: 'root' | 'menu' | 'page';
};
