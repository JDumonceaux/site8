import path from 'path';

import type { Features } from './Features.js';

// eslint-disable-next-line import/no-cycle
import { BaseDataService } from '../../services/BaseDataService.js';
import { Logger } from '../../utils/logger.js';
import { getFileService } from '../../utils/ServiceFactory.js';
import FilePath from '../files/FilePath.js';

import { buildServerType } from './functions/server/bServerType.js';

export class BuildService extends BaseDataService<Features> {
  public constructor() {
    super({
      filePath: path.join(
        FilePath.getServerFeatures(),
        'build',
        '@features.json',
      ),
      serviceName: 'BuildService',
    });
  }

  public async build(feature: string): Promise<void> {
    Logger.info(`BuildService: build -> ${feature}`);
    const service = getFileService();
    const ret = await this.readFile();

    const curr = ret.features.find((f) => f.name === feature);

    if (!curr) {
      return;
    }

    service.createFolder(path.join(FilePath.getServerFeatures(), curr.name));

    service.createFolder(path.join(FilePath.getClientFeatures(), curr.name));

    if (curr.types) {
      for (const type of curr.types) {
        await buildServerType(type, FilePath.getServerTypes());
      }
    }
    //    buildServerType(curr, FilePath.getClientTypes());
  }
}
