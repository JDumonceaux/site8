import type { Request, Response } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { getFileService } from '../../lib/utils/ServiceFactory.js';

const service = getFileService();

export const getFile = async (req: Request, res: Response): Promise<void> => {
  Logger.debug('Get File called');
  try {
    const { filename } = req.params;

    if (!filename) {
      res.status(400).json({ error: 'Invalid filename' });
      return;
    }

    const filePath = filename.trim() + '.json';
    const fileData = await service.getFile(filePath);

    if (fileData) {
      res.status(200).json(fileData);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    Logger.error('Get File failed', { error });
    res.sendStatus(500);
  }
};
