import type { Request, Response } from 'express';

import { badRequest, ok } from '../../lib/http/ResponseHelper.js';
import { getClientImagesService } from '../../utils/ServiceFactory.js';

type DeleteItemResponse = {
  readonly deletedFile: boolean;
  readonly ok: boolean;
  readonly removedEntries: number;
};

export const deleteItem = async (
  req: Request,
  res: Response<DeleteItemResponse | { error: string }>,
): Promise<void> => {
  const src =
    typeof req.query.src === 'string' ? req.query.src.trim() : undefined;

  if (!src) {
    badRequest(res, 'src is required');
    return;
  }

  const service = getClientImagesService();
  const result = await service.deleteImageBySrc(src);

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
