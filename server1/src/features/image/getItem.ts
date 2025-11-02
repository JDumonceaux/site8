import type { Request, Response } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { Image } from '../../types/Image.js';
import { getImageService } from '../../lib/utils/ServiceFactory.js';

export const getItem = async (
  req: Request,
  res: Response<Image>,
): Promise<void> => {
  try {
    const { id } = req.params;
    Logger.info(`Image: Get Item called: ${id}`);

    if (!id) {
      res.status(400).json({ message: 'Invalid ID' } as unknown as Image);
      return;
    }

    const tempId = Number.parseInt(id, 10);
    if (isNaN(tempId)) {
      res.status(400).json({ message: 'Invalid ID' } as unknown as Image);
      return;
    }

    const service = getImageService();
    const response = await service.getItem(tempId);

    if (response) {
      res.status(200).json(response);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
