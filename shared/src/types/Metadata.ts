import * as v from "valibot";

export const MetadataSchema = v.object({
  description: v.optional(v.string()),
  lastUpdated: v.optional(v.string()),
  subtitle: v.optional(v.string()),
  title: v.string(),
  totalGroups: v.optional(v.number()),
  totalItems: v.optional(v.number()),
  version: v.optional(v.string()),
});

export type Metadata = v.InferOutput<typeof MetadataSchema>;
