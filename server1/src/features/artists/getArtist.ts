import type { Request, Response } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { getArtistsService } from '../../lib/utils/ServiceFactory.js';
import { ArtistWithItems } from '../../types/ArtistWithItems.js';
import { parseRequestId } from '../../lib/utils/helperUtils.js';
import { ArtistNotFoundError } from './ArtistsService.js';

export const getArtist = async (
  req: Request<
    { id: string },
    ArtistWithItems | { error: string },
    unknown,
    unknown
  >,
  res: Response<ArtistWithItems | { error: string }>,
): Promise<void> => {
  try {
    const { id } = req.params;
    const parseResult = parseRequestId(id);

    if (!parseResult.id || parseResult.id <= 0) {
      Logger.warn(`Invalid artist ID format: ${id}`);
      res.status(400).json({
        error: `Invalid artist ID: ${id}. Must be a positive integer.`,
      });
      return;
    }

    const artistId = parseResult.id;
    if (typeof artistId !== 'number') {
      Logger.warn(`artistId is not a number: ${artistId}`);
      res.status(400).json({ error: 'Invalid artist ID.' });
      return;
    }
    Logger.info(`Artists: Get artist items called for ID: ${artistId}`);

    const service = getArtistsService();

    try {
      const artistWithItems = await service.getArtistWithItems(artistId);

      Logger.info(
        `Successfully retrieved artist ${artistId} with ${artistWithItems.items?.length || 0} items`,
      );
      res.status(200).json(artistWithItems);
    } catch (serviceError) {
      if (serviceError instanceof ArtistNotFoundError) {
        Logger.info(`Artist not found: ${artistId}`);
        res.status(404).json({
          error: `Artist with ID ${artistId} not found`,
        });
        return;
      }

      throw serviceError;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(
      `Error in getArtistWithItems for ID ${req.params?.id}: ${errorMessage}`,
      error,
    );
    res.sendStatus(500);
  }
};
