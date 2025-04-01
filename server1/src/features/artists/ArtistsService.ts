import FilePath from '../files/FilePath.js';
import { ArtistItems } from '../../types/ArtistItems.js';
import { Artists } from '../../types/Artists.js';
import { ArtistsItems } from '../../types/ArtistsItems.js';
import { ItemsFile } from '../../types/ItemsFile.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';

export class ArtistsService {
  private filePath: string;
  private fileService: ReturnType<typeof ServiceFactory.getFileService>;

  constructor(fileName: string = 'items.json') {
    this.filePath = FilePath.getDataDir(fileName);
    this.fileService = ServiceFactory.getFileService();
  }

  private async readFile(): Promise<ItemsFile> {
    try {
      const data = await this.fileService.readFile<ItemsFile>(this.filePath);
      if (!data) {
        throw new Error('File data is undefined');
      }
      return data;
    } catch (error) {
      throw new Error(`Error reading file: ${error}`);
    }
  }

  public async writeFile(data: ItemsFile): Promise<void> {
    try {
      await this.fileService.writeFile<ItemsFile>(data, this.filePath);
    } catch (error) {
      throw new Error(`Error writing file: ${error}`);
    }
  }

  public async getArtists(): Promise<Artists> {
    const data = await this.readFile();
    if (!data.artists || !Array.isArray(data.artists)) {
      throw new Error('No artists found');
    }
    return {
      metadata: data.metadata || { title: 'items' },
      items: data.artists,
    };
  }

  private sortItemsByTitle<T extends { title: string }>(items: T[]): T[] {
    return items.sort((a, b) => a.title.localeCompare(b.title));
  }

  public async getArtistItems(artistId: number): Promise<ArtistItems> {
    const data = await this.readFile();
    const artist = data.artists?.find((a) => a.id === artistId);

    if (!artist) {
      throw new Error(`Artist with ID ${artistId} not found`);
    }

    const items =
      data.items?.filter((item) => item.artistId === artistId) || [];
    return { artist, items: this.sortItemsByTitle(items) };
  }

  public async getArtistsItems(): Promise<ArtistsItems> {
    const data = await this.readFile();

    if (!data.artists) {
      throw new Error('No artists found');
    }

    // Sort artists by their sortName property.
    const sortedArtists = [...data.artists].sort((a, b) =>
      a.sortName.localeCompare(b.sortName),
    );

    const artistsItems = sortedArtists.map((artist) => {
      const items =
        data.items?.filter((item) => item.artistId === artist.id) || [];
      return { artist, items: this.sortItemsByTitle(items) };
    });

    return {
      metadata: data.metadata || { title: 'artist items' },
      items: artistsItems,
    };
  }
}
