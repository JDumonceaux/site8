import type { Request, Response } from 'express';

import { Logger } from '../../utils/logger.js';
import type { DeleteOptions } from './genericHandlerTypes.js';
import {
  badRequest,
  internalError,
  noContent,
  notFound,
  ok,
} from './ResponseHelper.js';

export const createDeleteHandler = <T>({
  getService,
  returnDeleted = false,
  serviceName,
}: DeleteOptions<T>) => {
  return async (
    req: Request,
    res: Response<T | { error: string }>,
  ): Promise<void> => {
    try {
      const id =
        req.body && typeof req.body === 'object'
          ? (req.body as Record<string, unknown>).id
          : undefined;

      if (!id) {
        badRequest(res, 'Invalid ID');
        return;
      }

      const idNum = Number(id);
      if (Number.isNaN(idNum) || idNum <= 0) {
        badRequest(res, 'Invalid ID');
        return;
      }

      Logger.info(`${serviceName}: Delete Item called: ${idNum}`);

      const service = getService();
      const deletedItem = await service.deleteItem(idNum);

      if (!deletedItem) {
        notFound(res, 'Item not found');
        return;
      }

      if (returnDeleted) {
        ok(res, deletedItem, serviceName);
      } else {
        noContent(res, serviceName);
      }
    } catch (error) {
      internalError(res, serviceName, error);
    }
  };
};
