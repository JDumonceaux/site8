import type { Place } from '../../types/Place.js';
import type { Places } from '../../types/Places.js';

import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
import { getImagesService } from '../../utils/ServiceFactory.js';
import FilePath from '../files/FilePath.js';

export class TravelService extends BaseDataService<Places> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('places.json'),
    });
  }

  public async getAllItems(): Promise<Places | undefined> {
    Logger.info(`TravelService: getAllItems called`);

    try {
      const data = await this.readFile();
      const sortedItems: Place[] = (data.items ?? []).toSorted(
        (a: Place, b: Place) => a.name.localeCompare(b.name),
      );
      return { items: sortedItems, metadata: data.metadata };
    } catch (error) {
      Logger.error(`TravelService: getAllItems --> Error: ${String(error)}`);
      return undefined;
    }
  }

  /**
   * Gets all places with enriched image data from images.json
   * @returns Places with full image details or undefined on error
   */
  public async getPlacesWithImages(): Promise<Places | undefined> {
    Logger.info(`TravelService: getPlacesWithImages called`);

    try {
      const placesData = await this.readFile();
      const imagesService = getImagesService();
      const imagesData = await imagesService.getItems();

      if (!imagesData?.items) {
        Logger.warn(
          'TravelService: getPlacesWithImages -> No images data available',
        );
        return placesData;
      }

      // Create a map of image IDs to full image objects for quick lookup
      const imageMap = new Map(imagesData.items.map((img) => [img.id, img]));

      // Enrich places with full image data
      const enrichedItems = (placesData.items ?? []).map((place) => {
        if (!place.images || place.images.length === 0) {
          return place;
        }

        // Map each image reference to its full data from images.json
        // Filter to only include images with type = 'primary'
        const enrichedImages = place.images
          .filter((imgRef) => imgRef.role === 'primary')
          .map((imgRef) => {
            const fullImageData = imageMap.get(imgRef.id);
            if (!fullImageData) {
              Logger.warn(
                `TravelService: Image ${imgRef.id} not found in images.json`,
              );
              return null;
            }

            return {
              ...imgRef,
              fileName: fullImageData.fileName,
              folder: fullImageData.folder,
              location: fullImageData.location,
              name: fullImageData.name,
            };
          })
          .filter((img) => img !== null);

        return {
          ...place,
          images: enrichedImages,
        } as Place;
      });

      const sortedItems = enrichedItems.toSorted((a: Place, b: Place) =>
        a.name.localeCompare(b.name),
      );

      return { items: sortedItems, metadata: placesData.metadata };
    } catch (error) {
      Logger.error(
        `TravelService: getPlacesWithImages --> Error: ${String(error)}`,
      );
      return undefined;
    }
  }
}
