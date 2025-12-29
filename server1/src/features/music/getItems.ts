import type { MusicItem } from '@site8/shared';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getMusicService } from '../../utils/ServiceFactory.js';

export const getItems = createCollectionHandler<MusicItem>({
  defaultTitle: 'Music',
  getService: getMusicService,
  handlerName: 'Music:getItems',
  return204OnEmpty: true,
});
