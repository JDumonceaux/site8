import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const schema = z.object({
  fileName: z.string().trim(),
  folder: z.string().trim().optional(),
  id: z.number(),
  itemId: z.number(),
  official_url: z.string().trim().optional(),
  src: z.string().optional(),
});

export type ImageAdd = z.infer<typeof schema>;

// Create a type from the schema
export type ImageAddExt = ImageAdd & {
  delete?: boolean;
  isDuplicate?: boolean;
  isSelected: boolean;
  lineId: number;
};
