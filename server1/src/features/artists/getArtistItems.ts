import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/utils/logger.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';
import { ArtistItems } from '../../types/ArtistItems.js';
import { parseRequestId } from '../../lib/utils/helperUtils.js';
import { ArtistNotFoundError } from './ArtistsService.js';

/**
 * Gets a specific artist and their associated items.
 *
 * @route GET /artists/:id/items
 * @param req.params.id - Artist ID (string that should parse to positive integer)
 * @returns 200 with ArtistItems data
 * @returns 400 for invalid ID format
 * @returns 404 if artist not found
 * @returns 500 for server errors
 */
export const getArtistItems = async (
  req: Request<
    { id: string },
    ArtistItems | { error: string },
    unknown,
    unknown
  >,
  res: Response<ArtistItems | { error: string }>,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    // Validate and parse the ID parameter
    if (!id?.trim()) {
      Logger.warn('Get artist items called with empty ID');
      return res.status(400).json({
        error: 'Artist ID is required',
      });
    }

    const trimmedId = id.trim();
    Logger.info(`Artists: Get artist items called for ID: ${trimmedId}`);

    // Parse and validate the ID
    const parseResult = parseRequestId(trimmedId);

    if (!parseResult.id || parseResult.id <= 0) {
      Logger.warn(`Invalid artist ID format: ${trimmedId}`);
      return res.status(400).json({
        error: `Invalid artist ID: ${trimmedId}. Must be a positive integer.`,
      });
    }

    const artistId = parseResult.id;

    // Get the service and retrieve artist items
    const service = ServiceFactory.getArtistsService();

    try {
      const artistItems = await service.getArtistItems(artistId);

      Logger.info(
        `Successfully retrieved artist ${artistId} with ${artistItems.items?.length || 0} items`,
      );
      return res.status(200).json(artistItems);
    } catch (serviceError) {
      // Handle specific service errors
      if (serviceError instanceof ArtistNotFoundError) {
        Logger.info(`Artist not found: ${artistId}`);
        return res.status(404).json({
          error: `Artist with ID ${artistId} not found`,
        });
      }

      // Re-throw unexpected service errors for global handler
      throw serviceError;
    }
  } catch (error) {
    // Log the error with context
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(
      `Error in getArtistItems for ID ${req.params?.id}: ${errorMessage}`,
      error,
    );

    // Let global error handler deal with unexpected errors
    next(error);
  }
};
