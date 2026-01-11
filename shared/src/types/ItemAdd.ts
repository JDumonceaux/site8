import * as v from "valibot";
import { ItemSchema } from "./Item.js";

/**
 * ItemAdd schema for validation
 * Omits id for new items
 */
export const ItemAddSchema = v.omit(ItemSchema, ["id"]);

export type ItemAdd = v.InferOutput<typeof ItemAddSchema>;
