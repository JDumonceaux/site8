import type { Request, Response } from 'express';

import { badRequest, conflict, ok } from '../../lib/http/ResponseHelper.js';
import { getClientImagesService } from '../../utils/ServiceFactory.js';

type RenameItemRequestBody = {
  readonly description?: string;
  readonly src?: string;
  readonly targetFileName?: string;
  readonly targetFolder?: string;
};

type RenameItemResponse = {
  readonly ok: boolean;
  readonly src: string;
};

export const renameItem = async (
  req: Request,
  res: Response<RenameItemResponse | { error: string }>,
): Promise<void> => {
  const body = req.body as RenameItemRequestBody;
  const description = body.description;
  const src = body.src?.trim();
  const targetFileName = body.targetFileName?.trim();
  const targetFolder = body.targetFolder?.trim();

  if (description !== undefined && typeof description !== 'string') {
    badRequest(res, 'description must be a string');
    return;
  }

  if (!src) {
    badRequest(res, 'src is required');
    return;
  }

  if (!targetFileName) {
    badRequest(res, 'targetFileName is required');
    return;
  }

  if (!targetFolder) {
    badRequest(res, 'targetFolder is required');
    return;
  }

  const service = getClientImagesService();

  try {
    const result = await service.renameImageBySrc({
      description,
      src,
      targetFileName,
      targetFolderLabel: targetFolder,
    });

    ok(
      res,
      {
        ok: true,
        src: result.src,
      },
      'Images:renameItem',
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'File name already exists'
    ) {
      conflict(res, 'File name already exists');
      return;
    }

    if (
      error instanceof Error &&
      error.message === 'File name must be at least 3 characters'
    ) {
      badRequest(res, 'File name must be at least 3 characters');
      return;
    }

    if (
      error instanceof Error &&
      error.message === 'File extension cannot be changed'
    ) {
      badRequest(res, 'File extension cannot be changed');
      return;
    }

    throw error;
  }
};
