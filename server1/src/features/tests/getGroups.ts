import type { RequestHandler } from 'express';

import { Logger } from '../../utils/logger.js';
import { getTestsGroupsService } from '../../utils/ServiceFactory.js';

export const getGroups: RequestHandler = async (_request, response) => {
  try {
    Logger.info('Tests:getGroups: Retrieving groups');

    const service = getTestsGroupsService();
    const data = await service.getItems();

    Logger.info('Tests:getGroups: Successfully retrieved groups');
    response.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(`Tests:getGroups: Failed to process request`, {
      error: errorMessage,
    });
    response.status(500).json({ error: errorMessage });
  }
};
