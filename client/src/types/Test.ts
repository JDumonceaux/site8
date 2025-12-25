import { z } from 'zod';
import { ParentSchema } from './Parent';

export const TestSchema = z
  .object({
    /** ‘add’, ‘delete’ or ‘edit’ */
    action: z.enum(['add', 'delete', 'edit']).optional(),
    /** Unique identifier */
    id: z.number(),
    /** ‘page’ or ‘project’ */
    level: z.enum(['page', 'project']).optional(),
    /** Identifier for the line */
    lineId: z.number(),
    /** Name of the test */
    name: z.string(),
    /** Parent object */
    parent: ParentSchema,
    /** Tuple of ['react', 'nodejs'] */
    projectType: z.tuple([z.literal('react'), z.literal('nodejs')]).optional(),
    /** Arbitrary text */
    text: z.string().optional(),
    /** ‘section’ or ‘test’ */
    type: z.enum(['section', 'test']).optional() /** Test value */,
    value: z.string().optional(),
  })
  .strict()
  .readonly();

export type Test = z.infer<typeof TestSchema>;
