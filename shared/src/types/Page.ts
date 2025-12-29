import { z } from "zod";

/**
 * Parent Schema for validation
 * Represents a parent reference with sorting information
 */
export const ParentSchema = z.object({
  id: z.number().int().positive("Parent ID must be a positive integer"),
  seq: z.number().int(),
  sortBy: z.string().optional(),
});

export type Parent = z.infer<typeof ParentSchema>;

/**
 * Page Schema for validation
 * Represents a page or menu item with comprehensive metadata
 */
export const PageSchema = z.object({
  create_date: z.date().optional(),
  edit_date: z.date().optional(),
  file: z.boolean().optional(),
  id: z.number().int().positive("Page ID must be a positive integer"),
  issue: z.string().optional(),
  line: z.number().int().optional(),
  parentItems: z.array(ParentSchema).optional(),
  readability_score: z.string().optional(),
  reading_time: z.string().optional(),
  text: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  to: z.string().optional(),
  toComplete: z.string().optional(),
  type: z.enum(["page", "root", "menu"]),
  url: z.string().optional(),
});

export type Page = z.infer<typeof PageSchema>;

/**
 * Page Edit type - extends Page with text field emphasized
 */
export const PageEditSchema = PageSchema.extend({
  text: z.string().optional(),
});

export type PageEdit = z.infer<typeof PageEditSchema>;
