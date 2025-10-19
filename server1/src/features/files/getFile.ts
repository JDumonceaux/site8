import { NextFunction, Request, Response } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { getFileService } from '../../lib/utils/ServiceFactory.js';

type Params = {
  filename: string;
};

const service = getFileService();

export const getFile = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
) => {
  Logger.debug('Get File called');
  try {
    const { filename } = req.params;
    const filePath = filename.trim() + '.json';
    const fileData = await service.getFile(filePath);

    if (fileData) {
      return res.status(200).json(fileData);
    }

    return res.status(204).send();
  } catch (error) {
    Logger.error('Get File failed', { error });
    return next(error);
  }
};
