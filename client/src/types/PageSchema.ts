import { REQUIRED_FIELD } from 'lib/utils/constants';
import { z } from 'zod';

export const PageSchema = z
  .object({
    create_date: z.date().optional(),
    edit_date: z.date().optional(),
    file: z.boolean().optional(),
    id: z.number(),
    issue: z.boolean().optional(),
    line: z.number(),
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
    to: z.string().optional(),
    toComplete: z.string().optional(),
    type: z.literal('page').optional(),
    url: z.string().optional(),
  })
  .refine(
    (data) => data.to ?? data.url,
    'Either to or url should be filled in.',
  );
