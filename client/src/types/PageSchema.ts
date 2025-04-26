import { REQUIRED_FIELD } from 'lib/utils/constants';
import { z } from 'zod';

export const PageSchema = z
  .object({
    id: z.number(),
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
    url: z.string().optional(),
    edit_date: z.date().optional(),
    create_date: z.date().optional(),
    reading_time: z.string().optional(),
    readability_score: z.string().optional(),
    parent: z.string().min(1, REQUIRED_FIELD),
    text: z.string().trim(),
    file: z.boolean().optional(),
    type: z.literal('page').optional(),
    issue: z.boolean().optional(),
    line: z.number(),
  })
  .refine(
    (data) => data.to ?? data.url,
    'Either to or url should be filled in.',
  );
