import type { Artists } from '../../types/Artists.js';

import { createGetHandler } from '../../lib/utils/createGetHandler.js';
import { getArtistsService } from '../../lib/utils/ServiceFactory.js';

/**
 * Retrieves all artists from the service
 */
export const getArtist = createGetHandler<Artists>({
  errorResponse: {
    items: undefined,
    metadata: { title: 'Artists' },
  },
  getData: async () => {
    const artistService = getArtistsService();
    return artistService.getArtists();
  },
  getItemCount: (data) => data.items?.length ?? 0,
  handlerName: 'getArtist',
});
