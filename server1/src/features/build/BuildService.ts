import path from 'path';

import { buildServerType } from './functions/server/bServerType.js';
import { Logger } from '../../lib/utils/logger.js';
import { getFileService } from '../../lib/utils/ServiceFactory.js';
import FilePath from '../files/FilePath.js';

import type { Features } from './Features.js';

export class BuildService {
  private readonly fileName = '@features.json';
  private readonly filePath: string = '';

  constructor() {
    this.filePath = path.join(
      FilePath.getServerFeatures(),
      'build',
      this.fileName,
    );
  }

  public async build(feature: string) {
    Logger.info(`BuildService: build -> ${feature}`);
    const service = getFileService();
    const ret = await service.readFile<Features>(this.filePath);

    if (!ret) {
      return Promise.resolve(undefined);
    }
    const curr = ret.features?.find((f) => f.name === feature);

    if (!curr) {
      return Promise.resolve(undefined);
    }

    service.createFolder(path.join(FilePath.getServerFeatures(), curr.name));

    service.createFolder(path.join(FilePath.getClientFeatures(), curr.name));

    curr.types?.forEach((type) => {
      buildServerType(type, FilePath.getServerTypes());
    });
    //    buildServerType(curr, FilePath.getClientTypes());
  }
}
