import { z } from 'zod';

// Define Zod Shape
const pageSchema = z.object({
  description: z.string().trim().optional(),
  fileName: z.string().trim(),
  folder: z.string().trim().optional(),
  id: z.number(),
  location: z
    .string({
      message: 'Location must be a string',
    })
    .max(250, 'Location max length exceeded: 500')
    .trim()
    .optional(),
  name: z
    .string({
      message: 'Name must be a string',
    })
    .max(100, 'Name max length exceeded: 100')
    .trim()
    .optional(),
  official_url: z.string().trim().optional(),
  src: z.string().trim().optional(),
  tags: z.string().trim().optional(),
});

// Create a type from the schema
export type FormType = z.infer<typeof pageSchema>;
export type FormKeys = keyof FormType;

export default pageSchema;
