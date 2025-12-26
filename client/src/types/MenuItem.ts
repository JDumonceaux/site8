import type { Parent } from './Parent';

export type MenuItem = {
  readonly id: number;
  readonly issue?: string;
  readonly items?: MenuItem[];
  readonly lineId?: number;
  readonly name?: string;
  readonly parentItem?: Parent;
  readonly title: string;
  readonly to?: string;
  readonly toComplete?: string;
  readonly type: 'menu' | 'page' | 'root';
  readonly url?: string | undefined;
};
