import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { Tests } from '../../types/Tests.js'; // Ensure Tests is an array type
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export const getItems = async (
  req: Request<
    Record<string, unknown>,
    unknown,
    unknown,
    Record<string, unknown>
  >,
  res: Response<Tests>,
  next: NextFunction,
): Promise<void> => {
  try {
    Logger.info(
      `Tests: Fetching items for request: ${JSON.stringify(req.query)}`,
    );

    const service = ServiceFactory.getTestsService();
    const items = await service.getItems();

    if (items) {
      res.status(200).json(items);
    } else {
      res.status(204).send();
    }
  } catch (error) {
    Logger.error(`Error fetching items: ${(error as Error).message}`, {
      error,
    });
    next(error);
  }
};
