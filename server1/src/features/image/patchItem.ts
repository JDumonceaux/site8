import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { Image, ImageSchema } from '../../types/Image.js';
import { PreferHeader } from '../../lib/utils/constants.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const patchItem = async (
  req: Request,
  res: Response<Image | { error: string }>,
  next: NextFunction,
) => {
  try {
    const prefer = req.get('Prefer');
    const returnRepresentation = prefer === PreferHeader.REPRESENTATION;

    // Validate request data using Zod
    const validationResult = ImageSchema.safeParse(req.body);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors
        .map((err) => err.message)
        .join(', ');
      return res
        .status(400)
        .json({ error: `Validation error: ${errorMessage}` });
    }
    const data = validationResult.data;

    Logger.info('Image: Patch Item called');

    const service = ServiceFactory.getImageService();
    await service.updateItem(data);

    if (returnRepresentation) {
      const updatedItem = await service.getItem(data.id);
      if (updatedItem) {
        return res.status(200).json(updatedItem);
      }
      return res.status(404).json({ error: 'Updated item not found' });
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
