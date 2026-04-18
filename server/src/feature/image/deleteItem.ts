import type { Request, Response } from 'express';

import { badRequest, ok } from '../../lib/http/ResponseHelper.js';
import { getImageService } from '../../utils/ServiceFactory.js';

type DeleteItemResponse = {
  readonly deletedFile: boolean;
  readonly ok: boolean;
  readonly removedEntries: number;
};

export const deleteItem = async (
  req: Request,
  res: Response<DeleteItemResponse | { error: string }>,
): Promise<void> => {
  const source =
    typeof req.query.src === 'string' ? req.query.src.trim() : undefined;

  if (!source) {
    badRequest(res, 'src is required');
    return;
  }

  const service = getImageService();
  const result = await service.deleteItem(source);

  ok(
    res,
    {
      deletedFile: result.deletedFile,
      ok: true,
      removedEntries: result.removedEntries,
    },
    'Images:deleteItem',
  );
};
