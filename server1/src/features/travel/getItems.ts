import type { Places } from '../../types/Places.js';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getTravelService } from '../../utils/ServiceFactory.js';

/**
 * Retrieves all travel destinations with enriched image data
 */
export const getItems = createGetHandler<Places>({
  errorResponse: {
    items: [],
    metadata: { title: 'Travel' },
  },
  getData: async () => {
    const service = getTravelService();
    const result = await service.getPlacesWithImages();
    return result ?? { items: [], metadata: { title: 'Travel' } };
  },
  getItemCount: (data) => data.items.length,
  handlerName: 'getItems',
  return204OnEmpty: true,
});
