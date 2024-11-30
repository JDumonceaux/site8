import type { Item } from './Item';

export type ItemAdd = Omit<Item, 'id'> & {};
