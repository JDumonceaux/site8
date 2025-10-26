import type { Request, Response } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { parseRequestId } from '../../lib/utils/helperUtils.js';
import { Image } from '../../types/Image.js';
import { RESPONSES } from '../../lib/utils/constants.js';
import { getImageService } from '../../lib/utils/ServiceFactory.js';

export const deleteItem = async (
  req: Request<{ id: string }>,
  res: Response<Image | Error>,
): Promise<void> => {
  try {
    const { id } = req.params;
    Logger.info(`Image: Delete Item called: ${id}`);

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
    res.sendStatus(500);
  }
};
