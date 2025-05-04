import type { z } from 'zod';

import type { PageSchema } from './PageSchema';

export type Page = z.infer<typeof PageSchema>;
