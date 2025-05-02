import { z } from 'zod';

export const AppSettingsSchema = z.object({
  showAll: z.boolean().optional().readonly(),
  showPages: z.boolean().optional().readonly(),
  showUnmatched: z.boolean().optional().readonly(),
});

export type AppSettings = z.infer<typeof AppSettingsSchema>;
