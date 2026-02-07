import type { RequestHandler } from 'express';

import { Logger } from '../../utils/logger.js';
import { getTestsSectionsService } from '../../utils/ServiceFactory.js';

export const getSections: RequestHandler = async (_request, response) => {
  try {
    Logger.info('Tests:getSections: Retrieving sections with groups');

    const service = getTestsSectionsService();
    const data = await service.getItems();

    Logger.info('Tests:getSections: Successfully retrieved sections');
    response.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(`Tests:getSections: Failed to process request`, {
      error: errorMessage,
    });
    response.status(500).json({ error: errorMessage });
  }
};
