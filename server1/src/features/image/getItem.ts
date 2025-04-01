import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { Image } from '../../types/Image.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const getItem = async (
  req: Request<{ id: string }>,
  res: Response<Image>,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    Logger.info(`Image: Get Item called: ${id}`);

    const tempId = Number.parseInt(id, 10);
    if (isNaN(tempId)) {
      return res
        .status(400)
        .json({ message: 'Invalid ID' } as unknown as Image);
    }

    const service = ServiceFactory.getImageService();
    const response = await service.getItem(tempId);

    if (response) {
      return res.status(200).json(response);
    }
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
