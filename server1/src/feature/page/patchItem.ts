import { Request, Response, NextFunction } from 'express';

interface IRequestParams {
  id: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRequestQuery {}

export const patchItem = async (
  _req: Request<IRequestParams, unknown, unknown, IRequestQuery>,
  _res: Response<unknown>,
  _next: NextFunction,
) => {
  //   try {
  //     // const Prefer = req.get('Prefer');
  //     // const returnRepresentation = Prefer === PreferHeader.REPRESENTATION;
  //     const service = new PageService();
  //     const fileService = new PageFileService();
  //     const item: PageEdit = req.body;
  //     const isValid = !Number.isNaN(item.id) && item.id !== 0;
  //     if (!isValid) {
  //       return res.status(400).json({ error: Responses.INVALID_ID });
  //     }
  //     const updateFile = typeof item.text === 'string' && item.text.length > 0;
  //     const promise1 = service.updateItem(item);
  //     const promise2 = fileService.updateFile(item.id, item.text);
  //     const promises = updateFile ? [promise1, promise2] : [promise1];
  //     const results = await Promise.allSettled(promises);
  //     // Use a for loop so you can break out.  You may not be able to break other loops.
  //     for (const result of results) {
  //       if (result.status !== 'fulfilled') {
  //         Logger.error(
  //           `pageRouter: patch -> Error: ${result.status} - ${result.reason}`,
  //         );
  //         res.status(400).json({ error: result.reason });
  //         res.end();
  //       }
  //     }
  //     // Return the updated item
  //     const ret = await new PageService().getItemCompleteById(item.id);
  //     res.status(200).json(ret);
  //   } catch (error) {
  //     Logger.error(`pageRouter: patch -> Error: ${error}`);
  //     res.status(500).json({ error: Errors.SERVER_ERROR });
  //   }
  // });
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
};
