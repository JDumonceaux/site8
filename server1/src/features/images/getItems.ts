import type { Image } from '@site8/shared';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getImagesService } from '../../utils/ServiceFactory.js';

export const getItems = createCollectionHandler<Image>({
  defaultTitle: 'Images',
  getService: getImagesService,
  handlerName: 'Images:getItems',
  return204OnEmpty: true,
});
