import { z } from "zod";

export const MetadataSchema = z.object({
  description: z.string().optional(),
  lastUpdated: z.string().optional(),
  subtitle: z.string().optional(),
  title: z.string(),
  totalGroups: z.number().optional(),
  totalItems: z.number().optional(),
  version: z.string().optional(),
});

export type Metadata = z.infer<typeof MetadataSchema>;
