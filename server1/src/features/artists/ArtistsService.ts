import type { Artists , ArtistsItems , ItemsFile } from '@site8/shared';
import type { ZodType } from 'zod';

import { ItemsFileSchema } from '@site8/shared';

import FilePath from '../../lib/filesystem/FilePath.js';
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';

// ============================================================================
// Custom Error Classes
// ============================================================================

export class ArtistNotFoundError extends Error {
  public constructor(artistId: number) {
    super(`Artist with ID ${artistId} not found`);
    this.name = 'ArtistNotFoundError';
  }
}

// ============================================================================
// Service Class
// ============================================================================

/**
 * Service for managing artists and their associated items.
 * Handles reading/writing artist data from/to JSON files with validation and caching.
 */
export class ArtistsService extends BaseDataService<ItemsFile> {
  public constructor(fileName = 'items.json') {
    super({
      cacheTTL: 5000,
      defaultMetadata: { title: 'artists' },
      enableCache: true,
      filePath: FilePath.getDataDir(fileName),
      validationSchema: ItemsFileSchema as ZodType<ItemsFile>,
    });
  }

  /**
   * Retrieves all artists with metadata.
   * @public
   * @returns {Promise<Artists>} List of all artists
   * @throws {Error} If artists cannot be retrieved
   */
  public async getArtists(): Promise<Artists> {
    const data = await this.readFile();

    return {
      items: data.artists,
      metadata: data.metadata,
    };
  }

  /**
   * Retrieves all artists with their associated items, sorted by artist sortName.
   * @public
   * @returns {Promise<ArtistsItems>} All artists with their items
   * @throws {Error} If artists cannot be retrieved
   */
  public async getArtistsItems(): Promise<ArtistsItems> {
    const data = await this.readFile();

    // Sort artists by their sortName property
    const sortedArtists = data.artists.toSorted((a, b) =>
      (a.sortName ?? a.name).localeCompare(b.sortName ?? b.name, undefined, {
        numeric: true,
        sensitivity: 'base',
      }),
    );

    const artistsItems = sortedArtists.map((artist) => {
      const items = data.items.filter((item) => item.artistId === artist.id);
      return {
        artist,
        items: this.sortItemsByTitle(items),
      };
    });

    Logger.debug(
      `Retrieved ${artistsItems.length} artists with their associated items`,
    );

    return {
      items: artistsItems,
      metadata: data.metadata,
    };
  }

  /**
   * Sorts items by title using locale-aware comparison.
   * @private
   * @template T - Type with a title property
   * @param {T[]} items - Items to sort
   * @returns {T[]} Sorted copy of items
   */
  private sortItemsByTitle<T extends { title: string }>(items: T[]): T[] {
    return items.toSorted((a, b) =>
      a.title.localeCompare(b.title, undefined, {
        numeric: true, // Handle numbers in strings correctly
        sensitivity: 'base',
      }),
    );
  }
}
