import { z } from "zod";

/**
 * Item Schema for validation
 * Represents an art/music item with comprehensive metadata
 */
export const ItemSchema = z.object({
  artist: z.string().optional(),
  artisticPeriod: z.string().optional(),
  artistId: z.number().int().positive("Artist ID must be a positive integer"),
  description: z.string().optional(),
  id: z.number().int().positive("Item ID must be a positive integer"),
  lineId: z.number().int().optional(),
  location: z.string().optional(),
  officialWebAddress: z.string().optional(),
  tags: z.array(z.string()).optional(),
  title: z.string().min(1, "Item title is required"),
  year: z.string().optional(),
  yearDisplay: z.string().optional(),
});

export type Item = z.infer<typeof ItemSchema>;
