import { z } from 'zod';

// Define Zod Shape
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const schema = z.object({
  artisticPeriod: z.string().trim().optional(),
  artistId: z.number().int().positive(),
  description: z.string().trim().optional(),
  location: z
    .string({
      invalid_type_error: 'Location must be a string',
    })
    .max(250, 'Location max length exceeded: 500')
    .trim()
    .optional(),
  officialWebAddress: z.string().trim().optional(),
  tags: z.string().trim().optional(),
  title: z.string().max(100, 'Name max length exceeded: 100').trim().optional(),
  year: z.string().trim().optional(),
});

export type ItemAdd = z.infer<typeof schema>;

// Create a type from the schema
export type ItemAddExt = ItemAdd & {
  lineId: number;
};
