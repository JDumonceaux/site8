import * as v from 'valibot';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const schema = v.object({
  fileName: v.pipe(v.string(), v.trim()),
  folder: v.optional(v.pipe(v.string(), v.trim())),
  id: v.number(),
  itemId: v.number(),
  official_url: v.optional(v.pipe(v.string(), v.trim())),
  src: v.optional(v.string()),
});

export type ImageAdd = v.InferOutput<typeof schema>;

// Create a type from the schema
export type ImageAddExt = ImageAdd & {
  delete?: boolean;
  isDuplicate?: boolean;
  isSelected: boolean;
  lineId: number;
};
