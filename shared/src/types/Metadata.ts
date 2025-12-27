import { z } from "zod";

/**
 * Metadata schema for collections
 */
export const MetadataSchema = z.object({
  description: z.string().nullish(),
  subtitle: z.string().nullish(),
  title: z.string().nullish(),
});

/**
 * Metadata type for collections
 * Contains descriptive information about a collection
 */
export type Metadata = z.infer<typeof MetadataSchema>;
