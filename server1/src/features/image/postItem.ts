import type { Request, Response } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { Image, ImageAdd, ImageSchemaAdd } from '../../types/Image.js';
import { PREFER_HEADER } from '../../lib/utils/constants.js';
import { getImageService } from '../../lib/utils/ServiceFactory.js';

export const postItem = async (
  req: Request,
  res: Response<Image | { error: string }>,
): Promise<void> => {
  try {
    const prefer = req.get('Prefer');
    const returnRepresentation = prefer === PREFER_HEADER.REPRESENTATION;

    // Validate request data using Add schema (no ID required)
    const validationResult = ImageSchemaAdd.safeParse(req.body);
    if (!validationResult.success) {
      const errorMessage = '';
      //   const errorMessage = validationResult.error
      //     .map((err) => `${err.path.join('.')}: ${err.message}`)
      //     .join(', ');
      res.status(400).json({ error: `Validation error: ${errorMessage}` });
      return;
    }

    const data = validationResult.data as ImageAdd;

    Logger.info('Image: Post Item called (create new)');

    const service = getImageService();

    try {
      // Create new item
      const newId = await service.addItem(data);

      if (returnRepresentation) {
        const newItem = await service.getItem(newId);

        if (!newItem) {
          res.status(500).json({ error: 'Failed to retrieve created item' });
        } else {
          res.setHeader('Location', `/image/${newId}`);
          res.status(201).json(newItem);
        }
        return;
      }

      // No representation requested
      res.setHeader('Location', `/image/${newId}`);
      res.status(201).send();
      return;
    } catch (serviceError) {
      // Handle specific service errors
      if (serviceError instanceof Error) {
        if (serviceError.message.includes('validation')) {
          res.status(400).json({ error: serviceError.message });
          return;
        }
        if (
          serviceError.message.includes('duplicate') ||
          serviceError.message.includes('already exists')
        ) {
          res.status(409).json({ error: serviceError.message });
          return;
        }
      }

      // Re-throw for generic error handler
      throw serviceError;
    }
  } catch (error) {
    Logger.error('Error in postItem:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.sendStatus(500);
    }
  }
};
