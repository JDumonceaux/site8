import { Parent } from './Parent.js';

export type Menu = {
  readonly id: number;
  readonly name: string;
  readonly parentItem?: Parent;
  readonly to?: string;
  readonly url?: string;
  readonly toComplete?: string;
  readonly type?: 'root' | 'menu';
  readonly issue?: boolean;
  readonly line: number;
};
