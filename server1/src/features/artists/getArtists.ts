import type { Artists } from '../../types/Artists.js';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getArtistsService } from '../../utils/ServiceFactory.js';

/**
 * Retrieves all artists
 */
export const getArtists = createGetHandler<Artists>({
  errorResponse: {
    items: undefined,
    metadata: { title: 'Artists' },
  },
  getData: async () => {
    const artistsService = getArtistsService();
    return artistsService.getArtists();
  },
  getItemCount: (data) => data.items?.length ?? 0,
  handlerName: 'getArtists',
  return204OnEmpty: true,
});
