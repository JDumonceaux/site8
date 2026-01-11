import * as v from "valibot";

/**
 * Parent Schema for validation
 * Represents a parent reference with sorting information
 */
export const ParentSchema = v.object({
  id: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1, "Parent ID must be a positive integer")
  ),
  seq: v.pipe(v.number(), v.integer()),
  sortBy: v.optional(v.string()),
});

export type Parent = v.InferOutput<typeof ParentSchema>;

/**
 * Page Schema for validation
 * Represents a page or menu item with comprehensive metadata
 */
export const PageSchema = v.object({
  create_date: v.optional(v.date()),
  edit_date: v.optional(v.date()),
  file: v.optional(v.boolean()),
  id: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1, "Page ID must be a positive integer")
  ),
  issue: v.optional(v.string()),
  line: v.optional(v.pipe(v.number(), v.integer())),
  parentItems: v.optional(v.array(ParentSchema)),
  readability_score: v.optional(v.string()),
  reading_time: v.optional(v.string()),
  text: v.optional(v.string()),
  title: v.pipe(v.string(), v.minLength(1, "Title is required")),
  to: v.optional(v.string()),
  toComplete: v.optional(v.string()),
  type: v.picklist(["page", "root", "menu"]),
  url: v.optional(v.string()),
});

export type Page = v.InferOutput<typeof PageSchema>;

/**
 * Page Edit type - extends Page with text field emphasized
 */
export const PageEditSchema = v.object({
  ...PageSchema.entries,
  text: v.optional(v.string()),
});

export type PageEdit = v.InferOutput<typeof PageEditSchema>;
