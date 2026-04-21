import type { Request, Response } from 'express';

import { getImagesApiService } from '../../utils/ServiceFactory.js';

type MoveItemsRequestBody = {
  readonly imageSrcs?: readonly string[];
  readonly targetFolder?: string;
};

type MoveItemsResponse = {
  readonly movedCount: number;
  readonly ok: boolean;
};

export const moveItems = async (
  req: Request,
  res: Response<MoveItemsResponse | { error: string }>,
): Promise<void> => {
  const body = req.body as MoveItemsRequestBody;
  const { imageSrcs } = body;
  const targetFolder = body.targetFolder?.trim();

  if (!Array.isArray(imageSrcs) || imageSrcs.length === 0) {
    res.status(400).json({ error: 'imageSrcs is required' });
    return;
  }

  if (!targetFolder) {
    res.status(400).json({ error: 'targetFolder is required' });
    return;
  }

  const service = getImagesApiService();
  const movedCount = await service.moveImagesToFolder(imageSrcs, targetFolder);

  res.status(200).json({ movedCount, ok: true });
};
