import type { Request, Response } from 'express';

import { ImageEditSchema } from '@site8/shared';
import { z } from 'zod';

import { Logger } from '../../utils/logger.js';
import { getImagesService } from '../../utils/ServiceFactory.js';

export const patchItems = async (
  req: Request,
  res: Response<void | { error: string }>,
): Promise<void> => {
  // Validate request body as Images collection with array of ImageEdit
  const ImagesSchema = z.object({
    items: z.array(ImageEditSchema),
    metadata: z.object({
      title: z.string(),
    }),
  });

  const validationResult = ImagesSchema.safeParse(req.body);

  if (!validationResult.success) {
    const errorMessage = validationResult.error.issues
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join(', ');
    Logger.warn(`Images patch validation failed: ${errorMessage}`);
    res.status(400).json({ error: `Validation error: ${errorMessage}` });
    return;
  }

  const data = validationResult.data;

  Logger.info(`Images: Patch Images called: `);

  try {
    const service = getImagesService();
    await service.updateItems(data.items);
    res.sendStatus(204);
  } catch (error) {
    Logger.error('Images: Patch Items error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
