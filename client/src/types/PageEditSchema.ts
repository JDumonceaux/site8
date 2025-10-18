import { REQUIRED_FIELD } from '@lib/utils/constants';
import { z } from 'zod';

export const PageEditSchema = z
  .object({
    id: z.number(),
    parent: z.string().min(1, REQUIRED_FIELD),
    readability_score: z.string().optional(),
    reading_time: z.string().optional(),
    text: z.string().trim(),
    title: z
      .string({
        invalid_type_error: 'Title must be a string',
        required_error: 'Title is required.',
      })
      .min(1, REQUIRED_FIELD)
      .max(500, 'Title max length exceeded: 500')
      .trim(),
    to: z.string(),
    url: z.string().min(1, REQUIRED_FIELD).trim(),
  })
  .refine(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (data) => data.to ?? data.url,
    'Either to or url should be filled in.',
  );

export type PageEdit = z.infer<typeof PageEditSchema>;
