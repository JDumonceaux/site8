import { REQUIRED_FIELD } from '@lib/utils/constants';
import { z } from 'zod';

/**
 * Schema for adding a new item with validation rules
 */
const itemAddSchema = z.object({
  artisticPeriod: z
    .string({
      message: 'Artistic period must be a string',
    })
    .trim()
    .max(100, 'Artistic period max length exceeded: 100')
    .optional(),
  artistId: z
    .number({
      message: 'Artist ID must be a number',
    })
    .int('Artist ID must be an integer')
    .positive('Artist ID must be positive'),
  description: z
    .string({
      message: 'Description must be a string',
    })
    .trim()
    .max(2000, 'Description max length exceeded: 2000')
    .optional(),
  location: z
    .string({
      message: 'Location must be a string',
    })
    .trim()
    .max(250, 'Location max length exceeded: 250')
    .optional(),
  officialWebAddress: z
    .string({
      message: 'Official web address must be a string',
    })
    .trim()
    .max(500, 'Official web address max length exceeded: 500')
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
  tags: z
    .string({
      message: 'Tags must be a string',
    })
    .trim()
    .max(500, 'Tags max length exceeded: 500')
    .optional(),
  title: z
    .string({
      message: 'Title is required',
    })
    .min(1, REQUIRED_FIELD)
    .max(100, 'Title max length exceeded: 100')
    .trim(),
  year: z
    .string({
      message: 'Year must be a string',
    })
    .trim()
    .max(50, 'Year max length exceeded: 50')
    .optional(),
});

/**
 * Type inferred from the item add schema
 */
export type ItemAdd = z.infer<typeof itemAddSchema>;

/**
 * Extended item add type with line identifier for form arrays
 * artistId is optional here as it's added during form submission
 */
export type ItemAddExt = Omit<ItemAdd, 'artistId'> & {
  artistId?: number;
  lineId: number;
};

export default itemAddSchema;
