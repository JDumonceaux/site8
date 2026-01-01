import type { Request, Response } from 'express';

import { ItemEditSchema } from '@site8/shared';
import { z } from 'zod';

import { Logger } from '../../utils/logger.js';
import { getItemsService } from '../../utils/ServiceFactory.js';

export const patchItems = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<boolean | string | { error: string }>,
): Promise<void> => {
  // Validate request body as array of ItemEdit
  const ItemEditArraySchema = z.array(ItemEditSchema);
  const validationResult = ItemEditArraySchema.safeParse(req.body);

  if (!validationResult.success) {
    const errorMessage = validationResult.error.issues
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join(', ');
    Logger.warn(`Items patch validation failed: ${errorMessage}`);
    res.status(400).json({ error: `Validation error: ${errorMessage}` });
    return;
  }

  const data = validationResult.data;

  Logger.info(`Items: Patch Items called: `);

  if (!Array.isArray(data) || data.length === 0) {
    res.status(400).json({ error: 'No valid data to change.' });
    return;
  }

  const service = getItemsService();

  try {
    const response = service.patchItems(data);
    if (response) {
      res.sendStatus(204);
    } else {
      res.status(500).json({ error: 'Edit failed' });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error('Items: Patch Items error:', errorMessage);
    res.status(500).json({ error: errorMessage });
  }
};
