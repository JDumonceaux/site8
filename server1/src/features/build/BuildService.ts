import { Logger } from '../../lib/utils/logger.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';
import { Features } from './Features.js';
import { buildServerType } from './buildServerType.js';
import FilePath from '../../lib/utils/FilePath.js';
import path from 'path';

export class BuildService {
  private fileName = 'features.json';
  private filePath = '';

  constructor() {
    this.filePath = FilePath.getDataDir(this.fileName);
  }

  public async build(feature: string) {
    Logger.info(`BuildService: build -> ${feature}`);
    const service = ServiceFactory.getFileService();
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

    buildServerType(curr, FilePath.getServerTypes());
    buildServerType(curr, FilePath.getClientTypes());
  }
}
