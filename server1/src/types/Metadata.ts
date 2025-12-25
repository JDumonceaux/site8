import { z } from 'zod';

export const MetadataSchema = z.object({
  title: z.string().default('artists'),
});

export type Metadata = {
  readonly title: string;
};
