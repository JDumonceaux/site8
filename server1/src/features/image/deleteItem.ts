import { NextFunction, Request, Response } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { parseRequestId } from '../../lib/utils/helperUtils.js';
import { Image } from '../../types/Image.js';
import { Responses } from '../../lib/utils/constants.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const deleteItem = async (
  req: Request<{ id: string }>,
  res: Response<Image | Error>,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    Logger.info(`Image: Delete Item called: ${id}`);

    const { id: idNum, isValid } = parseRequestId(id.trim());
    if (!isValid || !idNum) {
      Logger.info(`Image: Delete invalid param -> id: ${id}`);
      res.status(400).send(new Error(Responses.INVALID_ID));
      return;
    }

    const service = ServiceFactory.getImageService();
    const deletedItem = await service.deleteItem(idNum);
    if (deletedItem) {
      return res.status(200).json(deletedItem);
    }
    return res.status(404).send(new Error(Responses.NOT_FOUND));
  } catch (error) {
    next(error);
  }
};
