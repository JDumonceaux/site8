import { Parent } from './Parent.js';

export type MenuItem = {
  readonly id: number;
  readonly title: string;
  readonly parentItem?: Parent;
  readonly to?: string | undefined;
  readonly url?: string | undefined;
  readonly toComplete?: string | undefined;
  readonly type: 'root' | 'menu' | 'page';
  readonly issue?: boolean | undefined;
  readonly line: number;
};
