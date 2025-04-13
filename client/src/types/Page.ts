import { REQUIRED_FIELD } from 'lib/utils/constants';
import { z } from 'zod';

import type { ParentSortby } from './ParentSortby';

export type Page = {
  readonly create_date?: Date;
  readonly edit_date?: Date;
  readonly id: number;
  readonly items?: Page[];
  readonly name: string;
  readonly parentItems?: ParentSortby[];
  readonly readability_score?: string;
  readonly reading_time?: string;
  readonly text?: string;
  readonly to?: string;
  readonly toComplete?: string;
  readonly type: 'menu' | 'page' | 'root';
  readonly url?: string;
};

export const PageEditSchema = z
  .object({
    id: z.number(),
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
        required_error: 'Name is required.',
      })
      .min(1, REQUIRED_FIELD)
      .max(500, 'Name max length exceeded: 500')
      .trim(),
    parent: z.string().min(1, REQUIRED_FIELD),
    readability_score: z.string().trim().optional(),
    reading_time: z.string().trim().optional(),
    text: z.string().trim(),
    to: z.string().trim().optional(),
    url: z.string().trim().optional(),
  })
  .refine(
    (data) => data.to ?? data.url,
    'Either to or url should be filled in.',
  );

export type PageEdit = z.infer<typeof PageEditSchema>;
