import { readFile, writeFile } from 'fs/promises';
import FilePath from '../../lib/utils/FilePath.js';
import { Logger } from '../../lib/utils/logger.js';
import { Artists } from '../../types/Artists.js';
import { ItemsFile } from '../../types/ItemsFile.js';
import { ArtistItems } from 'src/types/ArtistItems.js';
import { ArtistsItems } from 'src/types/ArtistsItems.js';

export class ArtistsService {
  private fileName = 'items.json';
  private filePath = '';

  constructor() {
    this.filePath = FilePath.getDataDir(this.fileName);
  }

  // Get all data
  private async readFile(): Promise<ItemsFile | undefined> {
    try {
      const results = await readFile(this.filePath, { encoding: 'utf8' });
      return JSON.parse(results) as ItemsFile;
    } catch (error) {
      Logger.error(`ArtistsService: readFile -> ${error}`);
    }
    return undefined;
  }

  // Write to file
  public async writeFile(data: Readonly<ItemsFile>): Promise<boolean> {
    Logger.info(`ArtistsService: writeFile -> `);

    try {
      await writeFile(this.filePath, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
      });
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(`ArtistsService: writeFile. Error -> ${error}`);
      return Promise.reject(new Error(`Write file failed. Error: ${error}`));
    }
  }

  // Get all data
  public async getArtists(): Promise<Artists | undefined> {
    const ret = await this.readFile();
    return {
      metadata: ret?.metadata || { title: 'items' },
      items: ret?.artists,
    };
  }

  public async getArtistItems(
    artistId: number,
  ): Promise<ArtistItems | undefined> {
    const ret = await this.readFile();

    const artist = ret?.artists?.find((a) => a.id === artistId);

    if (!artist) {
      return undefined;
    }

    const items =
      artist && ret
        ? ret.items?.filter((x) => x.artistId === artistId)
        : undefined;

    const itemsSorted = items?.toSorted((a, b) =>
      a.title.localeCompare(b.title),
    );

    return {
      artist: artist,
      items: itemsSorted,
    };
  }

  public async getArtistsItems(): Promise<ArtistsItems | undefined> {
    const ret = await this.readFile();

    if (!ret || !ret.artists) {
      return undefined;
    }

    const artistsSorted = ret.artists.toSorted((a, b) =>
      a.sortName.localeCompare(b.sortName),
    );

    const retItems: ArtistItems[] = [];
    artistsSorted.forEach((artist) => {
      const items = ret.items?.filter((x) => x.artistId === artist.id);
      const itemsSorted = items?.toSorted((a, b) =>
        a.title.localeCompare(b.title),
      );
      retItems.push({ artist, items: itemsSorted });
    });

    return {
      metadata: ret?.metadata || { title: 'artist items' },
      items: retItems,
    };
  }
}
