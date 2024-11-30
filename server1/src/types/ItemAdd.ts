import type { Item } from './Item.js';

export type ItemAdd = Omit<Item, 'id'> & {};
