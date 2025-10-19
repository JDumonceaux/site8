import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { Image, ImageAdd, ImageSchemaAdd } from '../../types/Image.js';
import { PREFER_HEADER } from '../../lib/utils/constants.js';
import { getImageService } from '../../lib/utils/ServiceFactory.js';

export const postItem = async (
  req: Request,
  res: Response<Image | { error: string }>,
  next: NextFunction,
) => {
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
      return res
        .status(400)
        .json({ error: `Validation error: ${errorMessage}` });
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
          return res.status(500).json({
            error: 'Failed to retrieve created item',
          });
        }

        res.setHeader('Location', `/image/${newId}`);
        return res.status(201).json(newItem);
      }

      // No representation requested
      res.setHeader('Location', `/image/${newId}`);
      return res.status(201).send();
    } catch (serviceError) {
      // Handle specific service errors
      if (serviceError instanceof Error) {
        if (serviceError.message.includes('validation')) {
          return res.status(400).json({ error: serviceError.message });
        }
        if (
          serviceError.message.includes('duplicate') ||
          serviceError.message.includes('already exists')
        ) {
          return res.status(409).json({ error: serviceError.message });
        }
      }

      // Re-throw for generic error handler
      throw serviceError;
    }
  } catch (error) {
    Logger.error('Error in postItem:', error);
    if (error instanceof Error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    return next(error);
  }
};
