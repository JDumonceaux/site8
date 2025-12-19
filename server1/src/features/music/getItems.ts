import type { MusicItems } from '../../types/MusicItems.js';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getMusicService } from '../../utils/ServiceFactory.js';

/**
 * Retrieves all music items
 */
export const getItems = createGetHandler<MusicItems>({
  errorResponse: {
    items: undefined,
    metadata: { title: 'Music' },
  },
  getData: async () => {
    const service = getMusicService();
    const result = await service.getItems();
    return result ?? { items: undefined, metadata: { title: 'Music' } };
  },
  getItemCount: (data) => data.items?.length ?? 0,
  handlerName: 'getItems',
  return204OnEmpty: true,
});
