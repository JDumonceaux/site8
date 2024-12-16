import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const schema = z.object({
  artist: z.string().trim().optional(),
  description: z.string().trim().optional(),
  fileName: z.string().trim(),
  folder: z.string().trim().optional(),
  id: z.number(),
  location: z
    .string({
      invalid_type_error: 'Location must be a string',
    })
    .max(250, 'Location max length exceeded: 500')
    .trim()
    .optional(),
  name: z.string().max(100, 'Name max length exceeded: 100').trim().optional(),
  official_url: z.string().trim().optional(),
  src: z.string().optional(),
  tags: z.string().trim().optional(),
  year: z.string().trim().optional(),
});

export type ImageAdd = z.infer<typeof schema>;

// Create a type from the schema
export type ImageAddExt = ImageAdd & {
  delete?: boolean;
  isDuplicate?: boolean;
  isSelected: boolean;
  lineId: number;
};
