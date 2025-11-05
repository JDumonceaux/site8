import { PREFER_HEADER } from '../../lib/utils/constants.js';
import { Logger } from '../../lib/utils/logger.js';
import { getImageService } from '../../lib/utils/ServiceFactory.js';
import {
  type Image,
  type ImageAdd,
  ImageSchemaAdd,
} from '../../types/Image.js';

import type { Request, Response } from 'express';

export const putItem = async (
  req: Request,
  res: Response<Image | { error: string }>,
): Promise<void> => {
  try {
    const prefer = req.get('Prefer');
    const returnRepresentation = prefer === PREFER_HEADER.REPRESENTATION;

    const validationResult = ImageSchemaAdd.safeParse(req.body);
    if (!validationResult.success) {
      const errorMessage = '';
      // const errorMessage = validationResult.error.errors
      //   .map((err) => err.message)
      //   .join(', ');
      res.status(400).json({ error: `Validation error: ${errorMessage}` });
      return;
    }
    const data = validationResult.data as ImageAdd;

    Logger.info('Image: Put Item called');

    const service = getImageService();
    const newId = await service.addItem(data);

    if (returnRepresentation) {
      const newItem = await service.getItem(newId);
      if (newItem) {
        res.status(200).json(newItem);
      } else {
        res.status(404).json({ error: 'Created item not found' });
      }
      return;
    } else {
      res.setHeader('Location', `/image/${newId}`);
      res.status(201).send();
      return;
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
