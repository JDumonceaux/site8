import FilePath from '../files/FilePath.js';
import { ArtistItems } from '../../types/ArtistItems.js';
import { Artists } from '../../types/Artists.js';
import { ArtistsItems } from '../../types/ArtistsItems.js';
import { ItemsFile } from '../../types/ItemsFile.js';
import { ServiceFactory } from 'src/lib/utils/ServiceFactory.js';

export class ArtistsService {
  private filePath: string;

  constructor(fileName: string = 'items.json') {
    this.filePath = FilePath.getDataDir(fileName);
  }

  private async readFile(): Promise<ItemsFile | undefined> {
    const service = ServiceFactory.getFileService();
    return await service.readFile<ItemsFile>(this.filePath);
  }

  // Write data to file with error handling
  public async writeFile(data: ItemsFile): Promise<void> {
    const service = ServiceFactory.getFileService();
    await service.writeFile<ItemsFile>(data, this.filePath);
  }

  // Get all artists
  public async getArtists(): Promise<Artists> {
    const data = await this.readFile();
    if (data) {
      return {
        metadata: data.metadata || { title: 'items' },
        items: data.artists,
      };
    } else {
      throw new Error('No artists found');
    }
  }

  // Get items for a specific artist
  public async getArtistItems(artistId: number): Promise<ArtistItems> {
    const data = await this.readFile();
    const artist = data?.artists?.find((a) => a.id === artistId);

    if (!artist) {
      throw new Error(`Artist with ID ${artistId} not found`);
    }

    const items =
      data?.items?.filter((item) => item.artistId === artistId) || [];
    const sortedItems = items.sort((a, b) => a.title.localeCompare(b.title));

    return { artist, items: sortedItems };
  }

  // Get all artists and their items
  public async getArtistsItems(): Promise<ArtistsItems> {
    const data = await this.readFile();

    if (!data?.artists) {
      throw new Error('No artists found');
    }

    const sortedArtists = [...data.artists].sort((a, b) =>
      a.sortName.localeCompare(b.sortName),
    );

    const artistsItems = sortedArtists.map((artist) => {
      const items =
        data.items?.filter((item) => item.artistId === artist.id) || [];
      const sortedItems = items.sort((a, b) => a.title.localeCompare(b.title));
      return { artist, items: sortedItems };
    });

    return {
      metadata: data.metadata || { title: 'artist items' },
      items: artistsItems,
    };
  }
}
