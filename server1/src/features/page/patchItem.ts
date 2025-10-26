import { Request, Response, NextFunction } from 'express';
import { PageService } from './PageService.js';
import { PageFileService } from './PageFileService.js';
import { Logger } from '../../lib/utils/logger.js';
import { PageEdit } from '../../types/Page.js';

export const patchItem = async (
  req: Request<unknown, unknown, PageEdit, unknown>,
  res: Response<unknown>,
): Promise<void> => {
  try {
    const service = new PageService();
    const fileService = new PageFileService();
    const item = req.body as PageEdit;

    if (!item) {
      res.status(400).json({ error: 'Invalid item' });
      return;
    }

    // TODO - validate the item against Zod schema
    // if (!isValid) {
    //   return res.status(400).json({ error: Responses.INVALID_ID });
    // }

    // Meta data and text are stored in separate files - therefore two updates are needed.
    const promise1 = service.updateItem(item);
    const promise2 = fileService.updateFile(item.id, item.text);
    const results = await Promise.allSettled([promise1, promise2]);

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
    Logger.error(`pageRouter: patch -> Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
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
