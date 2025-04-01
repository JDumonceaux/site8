import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';
import { ArtistItems } from '../../types/ArtistItems.js';
import { parseRequestId } from '../../lib/utils/helperUtils.js';

export const getArtistItems = async (
  req: Request<{ id: string }, unknown, unknown, unknown>,
  res: Response<ArtistItems>,
  next: NextFunction,
) => {
  try {
    Logger.info('Items: Get Artist Items called');

    const service = ServiceFactory.getArtistsService();
    const { id } = req.params;
    const { id: idNum } = parseRequestId(id.trim());

    const artistItems = await service.getArtistItems(idNum || 0);

    if (!artistItems) {
      return res.status(204).send();
    }

    return res.status(200).json(artistItems);
  } catch (error) {
    next(error);
  }
};
