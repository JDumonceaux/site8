import { ItemSchema } from './Item.js';
import { z } from 'zod';

export const ItemAddSchema = ItemSchema.omit({ id: true });

export type ItemAdd = z.infer<typeof ItemAddSchema>;
