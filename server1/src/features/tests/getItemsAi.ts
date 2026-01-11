import type { RequestHandler } from 'express';

import { Logger } from '../../utils/logger.js';
import { getTestsAiService } from '../../utils/ServiceFactory.js';

export const getItemsAi: RequestHandler = async (_request, response) => {
  try {
    Logger.info('Tests:getItemsAi: Retrieving data');

    const service = getTestsAiService();
    const data = await service.getItems();

    Logger.info('Tests:getItemsAi: Successfully retrieved data');
    response.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(`Tests:getItemsAi: Failed to process request`, {
      error: errorMessage,
    });
    response.status(500).json({ error: errorMessage });
  }
};
