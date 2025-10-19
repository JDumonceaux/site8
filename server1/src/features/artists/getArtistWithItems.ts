import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { getArtistsService } from '../../lib/utils/ServiceFactory.js';
import { ArtistWithItems } from '../../types/ArtistWithItems.js';
import { parseRequestId } from '../../lib/utils/helperUtils.js';
import { ArtistNotFoundError } from './ArtistsService.js';

export const getArtistWithItems = async (
  req: Request<
    { id: string },
    ArtistWithItems | { error: string },
    unknown,
    unknown
  >,
  res: Response<ArtistWithItems | { error: string }>,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const parseResult = parseRequestId(id);

    if (!parseResult.id || parseResult.id <= 0) {
      Logger.warn(`Invalid artist ID format: ${id}`);
      return res.status(400).json({
        error: `Invalid artist ID: ${id}. Must be a positive integer.`,
      });
    }

    const artistId = parseResult.id;
    Logger.info(`Artists: Get artist items called for ID: ${artistId}`);

    const service = getArtistsService();

    try {
      const artistWithItems = await service.getArtistWithItems(artistId);

      Logger.info(
        `Successfully retrieved artist ${artistId} with ${artistWithItems.items?.length || 0} items`,
      );
      return res.status(200).json(artistWithItems);
    } catch (serviceError) {
      if (serviceError instanceof ArtistNotFoundError) {
        Logger.info(`Artist not found: ${artistId}`);
        return res.status(404).json({
          error: `Artist with ID ${artistId} not found`,
        });
      }

      throw serviceError;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(
      `Error in getArtistWithItems for ID ${req.params?.id}: ${errorMessage}`,
      error,
    );
    return next(error);
  }
};
