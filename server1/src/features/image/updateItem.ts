import type { Request, Response } from 'express';

import { badRequest, conflict, ok } from '../../lib/http/ResponseHelper.js';
import { getImageService } from '../../utils/ServiceFactory.js';

type UpdateItemRequestBody = {
  readonly description?: string;
  readonly src?: string;
  readonly targetFileName?: string;
  readonly targetFolder?: string;
  readonly title?: string;
};

type UpdateItemResponse = {
  readonly id: number;
  readonly ok: boolean;
  readonly src: string;
};

export const updateItem = async (
  req: Request,
  res: Response<UpdateItemResponse | { error: string }>,
): Promise<void> => {
  const body = req.body as UpdateItemRequestBody;
  const { description } = body;
  const src = body.src?.trim();
  const targetFileName = body.targetFileName?.trim();
  const targetFolder = body.targetFolder?.trim();
  const title = body.title?.trim();

  if (!src || !src.startsWith('/public/images/')) {
    badRequest(res, 'src is required and must start with /public/images/');
    return;
  }

  if (description !== undefined && typeof description !== 'string') {
    badRequest(res, 'description must be a string');
    return;
  }

  if (!targetFileName) {
    badRequest(res, 'targetFileName is required');
    return;
  }

  const service = getImageService();

  try {
    const result = await service.updateImage({
      description,
      src,
      targetFileName,
      targetFolderLabel: targetFolder,
      title,
    });

    ok(
      res,
      {
        id: result.id,
        ok: true,
        src: result.src,
      },
      'Images:updateItem',
    );
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Invalid src:')) {
      badRequest(res, error.message);
      return;
    }

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

    if (
      error instanceof Error &&
      error.message === 'Image record is missing a fileName'
    ) {
      badRequest(res, error.message);
      return;
    }

    throw error;
  }
};
