import type { Request, Response } from 'express';

import { badRequest, ok } from '../../lib/http/ResponseHelper.js';
import { getClientImagesService } from '../../utils/ServiceFactory.js';

type AddEntryRequestBody = {
  readonly entry?: {
    readonly fileName?: string;
    readonly folder?: string;
  } & Record<string, unknown>;
};

export const addEntry = async (
  req: Request,
  res: Response<{ id: number } | { error: string }>,
): Promise<void> => {
  const { entry } = req.body as AddEntryRequestBody;

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

  const service = getClientImagesService();
  const added = await service.addImageEntry({
    ...entry,
    fileName: entry.fileName,
    folder: entry.folder,
  });

  ok(res, { id: added.id }, 'Images:addEntry');
};
