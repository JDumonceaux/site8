import type { Image } from '@site8/shared';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getClientImagesService } from '../../utils/ServiceFactory.js';

const imagesServiceAdapter = () => ({
  getItems: async () => getClientImagesService().getItems(),
});

export const getItems = createCollectionHandler<Image>({
  defaultTitle: 'Images',
  getService: imagesServiceAdapter,
  handlerName: 'Images:getItems',
  return204OnEmpty: false,
});
