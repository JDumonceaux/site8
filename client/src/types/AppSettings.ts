import { z } from 'zod';

/**
 * Application settings keys and their default behaviors.
 */
export const AppSettingsSchema = z
  .object({
    showAll: z.boolean().default(false),
    showPages: z.boolean().default(false),
    showUnmatched: z.boolean().default(false),
  })
  .strict()
  .readonly();

export type AppSettings = z.infer<typeof AppSettingsSchema>;
export const AppSettingsDefault: AppSettings = AppSettingsSchema.parse({
  showAll: false,
  showPages: false,
  showUnmatched: false,
});
