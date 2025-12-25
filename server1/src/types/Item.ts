import { z } from 'zod';

export const ItemSchema = z.object({
  artisticPeriod: z.string().nullish(),
  artistId: z.number().int().positive('Artist ID must be a positive integer'),
  description: z.string().nullish(),
  id: z.number().int().positive('Item ID must be a positive integer'),
  location: z.string().nullish(),
  officialWebAddress: z.string().nullish(),
  tags: z.array(z.string()).nullish(),
  title: z.string().min(1, 'Item title is required'),
});

export type Item = z.infer<typeof ItemSchema>;
