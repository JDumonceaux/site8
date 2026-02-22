import type { Request, Response } from 'express';

import { badRequest, ok } from '../../lib/http/ResponseHelper.js';
import { ImageService } from './ImageService.js';

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

  const service = new ImageService();
  const result = await service.deleteItem(src);

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
