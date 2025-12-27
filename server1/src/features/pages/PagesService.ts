import type { PageMenu } from '../../types/PageMenu.js';
import type { Pages } from '../../types/Pages.js';

import { BaseDataService } from '../../services/BaseDataService.js';
import { cleanUpData } from '../../utils/objectUtil.js';
import FilePath from '../../lib/filesystem/FilePath.js';

export class PagesService extends BaseDataService<Pages> {
  public constructor() {
    super({
      filePath: FilePath.getDataDir('pages.json'),
    });
  }

  /**
   * Fixes all entries by cleaning up data
   */
  public override async fixAllEntries(): Promise<void> {
    await super.fixAllEntries<PageMenu>((item) => cleanUpData<PageMenu>(item));
  }
}
