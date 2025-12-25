import type { Request, Response } from 'express';

import type { Image } from '../../types/Image.js';

import { RESPONSES } from '../../utils/constants.js';
import { parseRequestId } from '../../utils/helperUtils.js';
import { Logger } from '../../utils/logger.js';
import { getImageService } from '../../utils/ServiceFactory.js';

export const deleteItem = async (
  req: Request,
  res: Response<Image | Error>,
): Promise<void> => {
  try {
    const { id } = req.params;
    Logger.info(`Image: Delete Item called: ${id}`);

    if (!id) {
      Logger.info(`Image: Delete invalid param -> id: ${id}`);
      res.status(400).send(new Error(RESPONSES.INVALID_ID));
      return;
    }

    const { id: idNum, isValid } = parseRequestId(id.trim());
    if (!isValid || !idNum) {
      Logger.info(`Image: Delete invalid param -> id: ${id}`);
      res.status(400).send(new Error(RESPONSES.INVALID_ID));
      return;
    }

    const service = getImageService();
    const deletedItem = await service.deleteItem(idNum);
    if (deletedItem) {
      res.status(200).json(deletedItem);
    } else {
      res.status(404).send(new Error(RESPONSES.NOT_FOUND));
    }
  } catch (error) {
    Logger.error('Image: Delete Item error:', error);
    res.sendStatus(500);
  }
};
