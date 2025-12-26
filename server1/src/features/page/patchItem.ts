import type { Request, Response } from 'express';

import type { PageEdit } from '../../types/Page.js';
import { PageEditSchema } from '../../types/Page.js';

import { Logger } from '../../utils/logger.js';

import { PageFileService } from './PageFileService.js';
import { PageService } from './PageService.js';

export const patchItem = async (
  req: Request<unknown, unknown, PageEdit, unknown>,
  res: Response<unknown>,
): Promise<void> => {
  try {
    const service = new PageService();
    const fileService = new PageFileService();

    // Validate request body against Zod schema
    const validationResult = PageEditSchema.safeParse(req.body);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join(', ');
      Logger.warn(`Page patch validation failed: ${errorMessage}`);
      res.status(400).json({ error: `Validation error: ${errorMessage}` });
      return;
    }

    const item = validationResult.data;

    // Meta data and text are stored in separate files - therefore two updates are needed.
    const results = await Promise.allSettled([
      Promise.try(() => service.updateItem(item)),
      Promise.try(() => fileService.updateFile(item.id, item.text)),
    ]);

    // If any update failed, log and return an error response.
    for (const result of results) {
      if (result.status === 'rejected') {
        Logger.error(`pageRouter: patch -> Error: ${result.reason}`);
        res
          .status(400)
          .json({ error: String(result.reason) || 'Update failed' });
        return;
      }
    }

    // Return success (optionally fetch and return the updated item)
    // const ret = await service.getItemCompleteById(item.id);
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    Logger.error('Page: Patch Item error:', error);
    res.sendStatus(500);
  }
};
// const { id } = req.params;
// Logger.info(`Page: Delete Item called: ${id}`);
// const { id: idNum, isValid } = parseRequestId(id.trim());
// if (!isValid || !idNum) {
//   Logger.info(`Page: Delete Item -> invalid param id: ${id}`);
//   //res.status(400).json({ error: Responses.INVALID_ID });
//   return res.end();
// }
// const service = new PageService();
// const fileService = new PageFileService();
// await Promise.all([service.deleteItem(idNum), fileService.deleteFile(idNum)])
//   .then((response) => {
//     if (response) {
//       res.status(200).json(response);
//     } else {
//       res.json(response);
//     }
//   })
//   .catch((error: Error) => {
//     return next(error);
//   });
// };
