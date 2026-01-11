import type { Request, Response } from 'express';

import { ItemEditSchema } from '@site8/shared';
import * as v from 'valibot';

import { validateBody } from '../../lib/http/RequestValidator.js';
import {
  badRequest,
  internalError,
  noContent,
} from '../../lib/http/ResponseHelper.js';
import { Logger } from '../../utils/logger.js';
import { getItemsService } from '../../utils/ServiceFactory.js';

const ItemEditArraySchema = v.array(ItemEditSchema);

/**
 * Handles PATCH requests to update multiple item objects
 * Note: Custom implementation required for array handling
 * @param req - Express request containing array of ItemEdit objects in body
 * @param res - Express response with 204 No Content on success or error object
 */
export const patchItems = async (
  req: Request,
  res: Response<boolean | string | { error: string }>,
): Promise<void> => {
  // Validate request body as array using standardized validator
  const validation = validateBody(req, ItemEditArraySchema);
  if (!validation.isValid) {
    badRequest(res, validation.errorMessage ?? 'Invalid request body');
    return;
  }

  const { data } = validation;
  if (data == null) {
    badRequest(res, 'Invalid request data');
    return;
  }

  Logger.info('Items: Patch Items called');

  if (!Array.isArray(data) || data.length === 0) {
    badRequest(res, 'No valid data to change');
    return;
  }

  const service = getItemsService();
  const response = service.patchItems(data);

  if (response) {
    noContent(res, 'Items');
  } else {
    internalError(res, 'Items', new Error('Edit failed'));
  }
};
