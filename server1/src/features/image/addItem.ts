import type { Request, Response } from 'express';

import { badRequest, ok } from '../../lib/http/ResponseHelper.js';
import { ImageService } from './ImageService.js';

type AddItemRequestBody = {
  readonly entry?: {
    readonly fileName?: string;
    readonly folder?: string;
  } & Record<string, unknown>;
};

export const addItem = async (
  req: Request,
  res: Response<{ id: number } | { error: string }>,
): Promise<void> => {
  const { entry } = req.body as AddItemRequestBody;

  if (!entry || typeof entry !== 'object') {
    badRequest(res, 'entry is required');
    return;
  }

  if (!entry.fileName || typeof entry.fileName !== 'string') {
    badRequest(res, 'entry.fileName is required');
    return;
  }

  if (!entry.folder || typeof entry.folder !== 'string') {
    badRequest(res, 'entry.folder is required');
    return;
  }

  const service = new ImageService();
  const added = await service.addItem({
    ...entry,
    fileName: entry.fileName,
    folder: entry.folder,
  });

  ok(res, { id: added.id }, 'Images:addItem');
};
