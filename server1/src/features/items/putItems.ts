import type { Request, Response } from 'express';

import { ItemAddSchema } from '@site8/shared';
import { z } from 'zod';

import { RequestValidator } from '../../lib/http/RequestValidator.js';
import { ResponseHelper } from '../../lib/http/ResponseHelper.js';
import { getItemsService } from '../../utils/ServiceFactory.js';

const ItemAddArraySchema = z.array(ItemAddSchema);

/**
 * Handles PUT requests to create or replace multiple items
 * Note: Custom implementation required for array handling
 * @param req - Express request containing array of ItemAdd objects in body
 * @param res - Express response with boolean result on success or error object
 */
export const putItems = async (
  req: Request,
  res: Response<boolean | { error: string }>,
): Promise<void> => {
  // Validate request body as array using standardized validator
  const validation = RequestValidator.validateBody(req, ItemAddArraySchema);
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

  const service = getItemsService();
  const response = await service.putItems(data);

  ResponseHelper.ok(res, response, 'Items: Put Items');
};
