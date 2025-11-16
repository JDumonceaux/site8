import { REQUIRED_FIELD } from '@lib/utils/constants';
import { z } from 'zod';

// Define Zod schema for image editing form
const imageEditSchema = z.object({
  description: z
    .string({
      message: 'Description must be a string',
    })
    .trim()
    .max(1000, 'Description max length exceeded: 1000')
    .optional(),
  fileName: z
    .string({
      message: 'File name is required',
    })
    .min(1, REQUIRED_FIELD)
    .max(255, 'File name max length exceeded: 255')
    .trim(),
  folder: z
    .string({
      message: 'Folder must be a string',
    })
    .trim()
    .max(255, 'Folder max length exceeded: 255')
    .optional(),
  id: z.number(),
  location: z
    .string({
      message: 'Location must be a string',
    })
    .trim()
    .max(250, 'Location max length exceeded: 250')
    .optional(),
  name: z
    .string({
      message: 'Name must be a string',
    })
    .trim()
    .max(100, 'Name max length exceeded: 100')
    .optional(),
  official_url: z
    .string({
      message: 'URL must be a string',
    })
    .trim()
    .max(500, 'URL max length exceeded: 500')
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: 'Must be a valid URL',
      },
    ),
  src: z.string().trim().optional(),
  tags: z
    .string({
      message: 'Tags must be a string',
    })
    .trim()
    .max(500, 'Tags max length exceeded: 500')
    .optional(),
});

// Create a type from the schema
export type FormType = z.infer<typeof imageEditSchema>;
export type FormKeys = keyof FormType;

export default imageEditSchema;
