import type { Image } from '@site8/shared';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getImagesService } from '../../utils/ServiceFactory.js';

const imagesServiceAdapter = () => ({
  getItems: async () => getImagesService().getItems(),
});

export const getItems = createCollectionHandler<Image>({
  defaultTitle: 'Images',
  getService: imagesServiceAdapter,
  handlerName: 'Images:getItems',
  return204OnEmpty: false,
});
