import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { Image, ImageAdd, ImageSchemaAdd } from '../../types/Image.js';
import { PreferHeader } from '../../lib/utils/constants.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const putItem = async (
  req: Request,
  res: Response<Image | { error: string }>,
  next: NextFunction,
) => {
  try {
    const prefer = req.get('Prefer');
    const returnRepresentation = prefer === PreferHeader.REPRESENTATION;

    const validationResult = ImageSchemaAdd.safeParse(req.body);
    if (!validationResult.success) {
      const errorMessage = '';
      // const errorMessage = validationResult.error.errors
      //   .map((err) => err.message)
      //   .join(', ');
      return res
        .status(400)
        .json({ error: `Validation error: ${errorMessage}` });
    }
    const data = validationResult.data as ImageAdd;

    Logger.info('Image: Put Item called');

    const service = ServiceFactory.getImageService();
    const newId = await service.addItem(data);

    if (returnRepresentation) {
      const newItem = await service.getItem(newId);
      if (newItem) {
        return res.status(200).json(newItem);
      }
      return res.status(404).json({ error: 'Created item not found' });
    } else {
      res.setHeader('Location', `/image/${newId}`);
      return res.status(201).send();
    }
  } catch (error) {
    next(error);
  }
};
