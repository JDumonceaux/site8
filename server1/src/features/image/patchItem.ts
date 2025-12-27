import { createPatchHandler } from '../../lib/http/genericHandlers.js';
import { ImageEditSchema } from '@site8/shared';
import { getImageService } from '../../utils/ServiceFactory.js';

export const patchItem = createPatchHandler({
  getService: getImageService,
  idFields: ['id', 'itemId'],
  schema: ImageEditSchema,
  serviceName: 'Image',
});
