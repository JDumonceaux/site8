import { Parent } from './Parent.js';

export type MenuItem = {
  readonly id: number;
  readonly title: string;
  readonly parentItem?: Parent;
  readonly to?: string;
  readonly url?: string;
  readonly toComplete?: string;
  readonly type: 'root' | 'menu' | 'page';
  readonly issue?: boolean;
  readonly line: number;
};
