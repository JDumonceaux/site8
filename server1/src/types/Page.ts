import { z } from 'zod';

const ParentSchema = z.object({
  id: z.number().int().positive(),
  seq: z.number().int(),
  sortBy: z.string().optional(),
});

export type Parent = z.infer<typeof ParentSchema>;

const PageSchema = z.object({
  create_date: z.date().optional(),
  edit_date: z.date().optional(),
  file: z.boolean().optional(),
  id: z.number().int().positive(),
  issue: z.string().optional(),
  line: z.number().int().optional(),
  parentItems: z.array(ParentSchema).optional(),
  readability_score: z.string().optional(),
  reading_time: z.string().optional(),
  text: z.string().optional(),
  title: z.string().min(1),
  to: z.string().optional(),
  toComplete: z.string().optional(),
  type: z.enum(['page', 'root', 'menu']),
  url: z.string().optional(),
});

export type Page = z.infer<typeof PageSchema>;

export const PageEditSchema = PageSchema.extend({
  text: z.string().optional(),
});

export type PageEdit = z.infer<typeof PageEditSchema>;
