import type { Image } from '@site8/shared';

import { createDeleteHandler } from '../../lib/http/genericHandlers.js';
import { getImageService } from '../../utils/ServiceFactory.js';

export const deleteItem = createDeleteHandler<Image>({
  getService: getImageService,
  returnDeleted: true,
  serviceName: 'Image',
});
