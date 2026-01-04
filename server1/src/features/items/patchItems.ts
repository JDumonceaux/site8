import type { Request, Response } from 'express';

import { ItemEditSchema } from '@site8/shared';
import { z } from 'zod';

import { RequestValidator } from '../../lib/http/RequestValidator.js';
import { ResponseHelper } from '../../lib/http/ResponseHelper.js';
import { Logger } from '../../utils/logger.js';
import { getItemsService } from '../../utils/ServiceFactory.js';

const ItemEditArraySchema = z.array(ItemEditSchema);

/**
 * Handles PATCH requests to update multiple item objects
 * Note: Custom implementation required for array handling
 * @param req - Express request containing array of ItemEdit objects in body
 * @param res - Express response with 204 No Content on success or error object
 */
export const patchItems = (
  req: Request,
  res: Response<boolean | string | { error: string }>,
): void => {
  // Validate request body as array using standardized validator
  const validation = RequestValidator.validateBody(req, ItemEditArraySchema);
  if (!validation.isValid) {
    ResponseHelper.badRequest(
      res,
      validation.errorMessage ?? 'Invalid request body',
    );
    return;
  }

  const { data } = validation;
  if (data == null) {
    ResponseHelper.badRequest(res, 'Invalid request data');
    return;
  }

  Logger.info('Items: Patch Items called');

  if (!Array.isArray(data) || data.length === 0) {
    ResponseHelper.badRequest(res, 'No valid data to change');
    return;
  }

  const service = getItemsService();
  const response = service.patchItems(data);

  if (response) {
    ResponseHelper.noContent(res, 'Items');
  } else {
    ResponseHelper.internalError(res, 'Items', new Error('Edit failed'));
  }
};
