import { REQUIRED_FIELD } from '@lib/utils/constants';
import * as v from 'valibot';

export const PageEditSchema = v.pipe(
  v.object({
    id: v.number(),
    parent: v.pipe(v.string(), v.minLength(1, REQUIRED_FIELD)),
    readability_score: v.optional(v.string()),
    reading_time: v.optional(v.string()),
    text: v.pipe(v.string(), v.trim()),
    title: v.pipe(
      v.string('Title must be a string'),
      v.minLength(1, REQUIRED_FIELD),
      v.maxLength(500, 'Title max length exceeded: 500'),
      v.trim(),
    ),
    to: v.string(),
    url: v.pipe(v.string(), v.minLength(1, REQUIRED_FIELD), v.trim()),
  }),
  v.check(
    (data) => !!(data.to || data.url),
    'Either to or url should be filled in.',
  ),
);

export type PageEdit = v.InferOutput<typeof PageEditSchema>;
