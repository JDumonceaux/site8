import type { Request } from 'express';

import type { Image } from '../../types/Image.js';

import { createGetHandlerWithParams } from '../../lib/http/genericHandlers.js';
import { getImageService } from '../../utils/ServiceFactory.js';

/**
 * Retrieves a specific image by ID
 */
export const getItem = createGetHandlerWithParams<Image>({
  errorResponse: {
    fileName: '',
    id: 0,
  },
  getData: async (req: Request) => {
    const id = req.params['id'] as string;
    const imageId = Number.parseInt(id, 10);
    const service = getImageService();
    const result = await service.getItem(imageId);
    return result ?? { fileName: '', id: 0, itemId: 0 };
  },
  handlerName: 'getItem',
  return204OnEmpty: false,
  validateParams: (req: Request) => {
    const { id } = req.params;
    if (!id) {
      return { errorMessage: 'Missing image id parameter', isValid: false };
    }
    const imageId = Number.parseInt(id, 10);
    if (isNaN(imageId)) {
      return {
        errorMessage: 'Invalid image id - must be a number',
        isValid: false,
      };
    }
    return { isValid: true };
  },
});
