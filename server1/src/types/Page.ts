import { z } from 'zod';

export const PageSchema = z.object({
  id: z.number(),
  title: z.string(),
  to: z.string().optional(),
  toComplete: z.string().optional(),
  url: z.string().optional(),
  edit_date: z.date().optional(),
  create_date: z.date().optional(),
  reading_time: z.string().optional(),
  readability_score: z.string().optional(),
  // parentItem: Parent.optional(),
  file: z.boolean().optional(),
  type: z.literal('page').optional(),
  issue: z.boolean().optional(),
  line: z.number(),
});

export type Page = z.infer<typeof PageSchema>;

export type PageEdit = {
  readonly text?: string;
} & Page;

export type PageMenu = {
  readonly type: 'page' | 'root' | 'menu';
} & Omit<Page, 'type'>;

export const PageSchemaAdd = PageSchema.omit({ id: true });
