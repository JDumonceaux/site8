import { z } from 'zod';

import { createPatchHandler } from '../../lib/http/genericHandlers.js';
import { ImageSchema } from '../../types/Image.js';
import { getImageService } from '../../utils/ServiceFactory.js';

// Create a partial schema for PATCH operations
// Patch schema: all fields optional except id and itemId (strings, will be parsed to numbers), fileName required
const ImagePatchSchema = ImageSchema.partial().extend({
  fileName: z.string().min(1, 'fileName is required'),
  id: z.string().min(1, 'ID is required'),
  itemId: z.string().min(1, 'itemId is required'),
});

export const patchItem = createPatchHandler({
  getService: getImageService,
  idFields: ['id', 'itemId'],
  schema: ImagePatchSchema,
  serviceName: 'Image',
});
