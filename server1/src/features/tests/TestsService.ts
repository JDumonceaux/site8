import type { Collection, Test, Tests } from '@site8/shared';
import type { TestFile } from '../../types/TestFile.js';

import FilePath from '../../lib/filesystem/FilePath.js';
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';

export class TestsService extends BaseDataService<TestFile> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('tests.json'),
    });
  }

  public async getTestsData(): Promise<Tests> {
    try {
      const rawData = await this.readFile();

      // Return Tests structure with sections (empty for now since we don't have section mapping)
      return {
        metadata: rawData.metadata,
        sections: [],
      };
    } catch (error) {
      Logger.error(`TestsService: getTestsData --> Error: ${String(error)}`);
      throw error;
    }
  }

  public async getCollection(): Promise<Collection<Test>> {
    const data = await this.readFile();
    return {
      items: [...data.items] as Test[],
      metadata: data.metadata,
    };
  }
}
