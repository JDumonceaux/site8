import { Request, Response, NextFunction } from 'express';
import { PageService } from './PageService.js';
import { PageFileService } from './PageFileService.js';
import { PageEdit } from 'src/types/PageEdit.js';
import { Logger } from '../../lib/utils/logger.js';

export const patchItem = async (
  req: Request<unknown, unknown, PageEdit, unknown>,
  res: Response<unknown>,
  _next: NextFunction,
) => {
  try {
    const service = new PageService();
    const fileService = new PageFileService();
    const item = req.body as PageEdit;

    if (!item) {
      return res.status(400).json({ error: 'Invalid item' });
    }

    // TODO - validate the item against Zod schema
    // if (!isValid) {
    //   return res.status(400).json({ error: Responses.INVALID_ID });
    // }

    // Meta data and text are stored in separate files - therefore two updates are needed.
    const promise1 = service.updateItem(item);
    const promise2 = fileService.updateFile(item.id, item.text);
    const promises = [promise1, promise2];
    await Promise.allSettled(promises);
    // Use a for loop so you can break out.  You may not be able to break other loops.
    // for (const result of results) {
    //   if (result.status !== 'fulfilled') {
    //     Logger.error(
    //       `pageRouter: patch -> Error: ${result.status} - ${result.reason}`,
    //     );
    //     res.status(400).json({ error: result.reason });
    //     res.end();
    //   }
    // }
    // Return the updated item
    // const ret = await new PageService().getItemCompleteById(item.id);
    res.status(200).json('Success');
  } catch (error) {
    Logger.error(`pageRouter: patch -> Error: ${error}`);
    res.status(500);
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
//     next(error);
//   });
// };
