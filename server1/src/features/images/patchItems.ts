import type { Request, Response } from 'express';

import { ImageEditSchema } from '@site8/shared';
import { z } from 'zod';

import { RequestValidator } from '../../lib/http/RequestValidator.js';
import { ResponseHelper } from '../../lib/http/ResponseHelper.js';
import { Logger } from '../../utils/logger.js';
import { getImagesService } from '../../utils/ServiceFactory.js';

// Schema for Images collection with array of ImageEdit
const ImagesSchema = z.object({
  items: z.array(ImageEditSchema),
  metadata: z.object({
    title: z.string(),
  }),
});

/**
 * Handles PATCH requests to update multiple image items
 * Note: Custom implementation required for collection with metadata structure
 * @param req - Express request containing Images collection with array of ImageEdit objects in body
 * @param res - Express response with 204 No Content on success or error object
 */
export const patchItems = async (
  req: Request,
  res: Response<void | { error: string }>,
): Promise<void> => {
  // Validate request body using standardized validator
  const validation = RequestValidator.validateBody(req, ImagesSchema);
  if (!validation.isValid) {
    ResponseHelper.badRequest(res, validation.errorMessage!);
    return;
  }

  const data = validation.data!;
  Logger.info('Images: Patch Images called');

  const service = getImagesService();
  await service.updateItems(data.items);

  ResponseHelper.noContent(res, 'Images');
};
