import { z } from "zod";
import { ItemSchema } from "./Item.js";

/**
 * ItemAdd schema for validation
 * Omits id for new items
 */
export const ItemAddSchema = ItemSchema.omit({ id: true });

export type ItemAdd = z.infer<typeof ItemAddSchema>;
