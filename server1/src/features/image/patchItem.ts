import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { Image, ImageSchema } from '../../types/Image.js';
import { PreferHeader } from '../../lib/utils/constants.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';
import { z } from 'zod';

// Create a partial schema for PATCH operations
const ImagePatchSchema = ImageSchema.partial().extend({
  id: z.string().min(1, 'ID is required'), // ID is always required
});

export const patchItem = async (
  req: Request,
  res: Response<Image | { error: string }>,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const prefer = req.get('Prefer');
    const returnRepresentation = prefer === PreferHeader.REPRESENTATION;

    // Validate ID parameter
    if (!id) {
      return res.status(400).json({ error: 'ID parameter is required' });
    }

    // Add ID to request body for validation
    const requestData = { ...req.body, id };

    // Validate request data using partial Zod schema
    const validationResult = ImagePatchSchema.safeParse(requestData);
    if (!validationResult.success) {
      const errorMessage = '';
      // const errorMessage = validationResult.error.errors
      //   .map((err) => `${err.path.join('.')}: ${err.message}`)
      //   .join(', ');
      return res
        .status(400)
        .json({ error: `Validation error: ${errorMessage}` });
    }

    const data = validationResult.data;

    // Ensure ID consistency between URL and body
    if (req.body.id && req.body.id !== id) {
      return res.status(400).json({
        error: 'ID in request body must match ID in URL',
      });
    }

    Logger.info(`Image: Patch Item called for ID: ${id}`);

    const service = ServiceFactory.getImageService();

    try {
      // Perform the update and get result in one operation if possible
      const updatedItem = await service.updateItem(data);

      if (returnRepresentation) {
        // If service.updateItem returns the updated item, use it
        // Otherwise, fetch it separately
        const result = updatedItem || (await service.getItem(id));

        if (!result) {
          return res.status(404).json({ error: 'Item not found after update' });
        }

        return res.status(200).json(result);
      }

      return res.status(204).send();
    } catch (serviceError) {
      // Handle specific service errors
      if (serviceError instanceof Error) {
        if (serviceError.message.includes('not found')) {
          return res.status(404).json({ error: 'Item not found' });
        }
        if (serviceError.message.includes('validation')) {
          return res.status(400).json({ error: serviceError.message });
        }
      }

      // Re-throw for generic error handler
      throw serviceError;
    }
  } catch (error) {
    Logger.error('Error in patchItem:', error);
    next(error);
  }
};
