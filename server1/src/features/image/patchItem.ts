import type { Request, Response } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { Image, ImageSchema } from '../../types/Image.js';
import { PREFER_HEADER } from '../../lib/utils/constants.js';
import { getImageService } from '../../lib/utils/ServiceFactory.js';
import { z } from 'zod';

// Create a partial schema for PATCH operations
// Patch schema: all fields optional except id and itemId (strings, will be parsed to numbers), fileName required
const ImagePatchSchema = ImageSchema.partial().extend({
  id: z.string().min(1, 'ID is required'),
  fileName: z.string().min(1, 'fileName is required'),
  itemId: z.string().min(1, 'itemId is required'),
});

export const patchItem = async (
  req: Request,
  res: Response<Image | { error: string }>,
): Promise<void> => {
  try {
    const { id } = req.params;
    const prefer = req.get('Prefer');
    const returnRepresentation = prefer === PREFER_HEADER.REPRESENTATION;

    // Validate ID parameter
    if (!id) {
      res.status(400).json({ error: 'ID parameter is required' });
      return;
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
      res.status(400).json({ error: `Validation error: ${errorMessage}` });
      return;
    }

    // Convert id and itemId to numbers, ensure fileName is present and types match Image
    const {
      id: idStr,
      itemId: itemIdStr,
      fileName,
      ...rest
    } = validationResult.data;
    const idNum = Number(idStr);
    const itemIdNum = Number(itemIdStr);
    if (isNaN(idNum) || isNaN(itemIdNum)) {
      res.status(400).json({ error: 'ID and itemId must be valid numbers' });
      return;
    }
    const data = {
      ...rest,
      id: idNum,
      itemId: itemIdNum,
      fileName,
    };

    // Ensure ID consistency between URL and body
    if (req.body.id && req.body.id !== id) {
      res.status(400).json({
        error: 'ID in request body must match ID in URL',
      });
      return;
    }

    Logger.info(`Image: Patch Item called for ID: ${id}`);

    const service = getImageService();

    try {
      // Perform the update and get result in one operation if possible
      const updatedId = await service.updateItem(data);

      if (returnRepresentation) {
        // Always fetch the updated item by id
        const result = await service.getItem(updatedId);
        if (!result) {
          res.status(404).json({ error: 'Item not found after update' });
        } else {
          res.status(200).json(result);
        }
      }
      res.sendStatus(204);
      return;
    } catch (serviceError) {
      // Handle specific service errors
      if (serviceError instanceof Error) {
        if (serviceError.message.includes('not found')) {
          res.status(404).json({ error: 'Item not found' });
          return;
        }
        if (serviceError.message.includes('validation')) {
          res.status(400).json({ error: serviceError.message });
          return;
        }
      }

      // Re-throw for generic error handler
      throw serviceError;
    }
  } catch (error) {
    Logger.error('Error in patchItem:', error);
    res.sendStatus(500);
  }
};
