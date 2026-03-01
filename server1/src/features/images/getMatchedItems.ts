import type { ImageFile } from '@site8/shared';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getClientImagesService } from '../../utils/ServiceFactory.js';

const matchedImagesServiceAdapter = () => ({
  getItems: async () => getClientImagesService().getMatchedItems(),
});

export const getMatchedItems = createCollectionHandler<ImageFile>({
  defaultTitle: 'Matched Images',
  getService: matchedImagesServiceAdapter,
  handlerName: 'Images:getMatchedItems',
  return204OnEmpty: false,
});
