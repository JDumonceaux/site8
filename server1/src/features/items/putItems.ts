import type { Request, Response } from 'express';

import { ItemAddSchema } from '../../types/ItemAdd.js';
import { z } from 'zod';

import { Logger } from '../../utils/logger.js';
import { getItemsService } from '../../utils/ServiceFactory.js';

export const putItems = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<boolean | { error: string }>,
): Promise<void> => {
  // Validate request body as array of ItemAdd
  const ItemAddArraySchema = z.array(ItemAddSchema);
  const validationResult = ItemAddArraySchema.safeParse(req.body);

  if (!validationResult.success) {
    const errorMessage = validationResult.error.issues
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join(', ');
    Logger.warn(`Items put validation failed: ${errorMessage}`);
    res.status(400).json({ error: `Validation error: ${errorMessage}` });
    return;
  }

  const data = validationResult.data;

  Logger.info(`Items: Put Items called: `);

  const service = getItemsService();

  try {
    const response = await service.putItems(data);
    if (response) {
      res.status(200).json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    Logger.error('Items: Put Items error:', error);
    res.sendStatus(500);
  }
};
