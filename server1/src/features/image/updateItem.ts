import type { Request, Response } from 'express';

import { badRequest, conflict, ok } from '../../lib/http/ResponseHelper.js';
import { ImageService } from './ImageService.js';

type UpdateItemRequestBody = {
  readonly description?: string;
  readonly src?: string;
  readonly targetFileName?: string;
  readonly targetFolder?: string;
};

type UpdateItemResponse = {
  readonly ok: boolean;
  readonly src: string;
};

export const updateItem = async (
  req: Request,
  res: Response<UpdateItemResponse | { error: string }>,
): Promise<void> => {
  const body = req.body as UpdateItemRequestBody;
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

  const service = new ImageService();

  try {
    const result = await service.updateImage({
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
      'Images:updateItem',
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
