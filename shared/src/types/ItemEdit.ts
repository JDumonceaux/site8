import { z } from "zod";

/**
 * ItemEdit schema for validation
 * Used for editing existing items
 */
export const ItemEditSchema = z.object({
  artist: z.string().optional(),
  description: z.string().optional(),
  fileName: z.string().min(1),
  folder: z.string().optional(),
  id: z.number().int().positive(),
  location: z.string().optional(),
  name: z.string().optional(),
  official_url: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string()).optional(),
  year: z.string().optional(),
});

export type ItemEdit = z.infer<typeof ItemEditSchema>;
