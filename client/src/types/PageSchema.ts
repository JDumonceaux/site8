import { REQUIRED_FIELD } from '@lib/utils/constants';
import * as v from 'valibot';

export const PageSchema = v.pipe(
  v.object({
    create_date: v.optional(v.date()),
    edit_date: v.optional(v.date()),
    file: v.optional(v.boolean()),
    id: v.number(),
    issue: v.optional(v.boolean()),
    line: v.number(),
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
    to: v.optional(v.string()),
    toComplete: v.optional(v.string()),
    type: v.optional(v.literal('page')),
    url: v.optional(v.string()),
  }),
  v.check((data) => {
    const value = data.to ?? data.url;
    return value != null && value.trim() !== '';
  }, 'Either to or url should be filled in.'),
);
