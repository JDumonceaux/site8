import { getDataDir } from '../../lib/utils/FilePath.js';
import { Logger } from '../../lib/utils/logger.js';
import { ServiceFactory } from 'src/lib/utils/ServiceFactory.js';
import { Features } from './Features.js';

export class BuildService {
  private fileName = 'features.json';
  private filePath = '';

  constructor() {
    this.filePath = getDataDir(this.fileName);
  }

  public async build(feature: string) {
    Logger.info(`BuildService: build -> ${feature}`);
    const service = ServiceFactory.getFileService();
    const ret = await service.readFile<Features>(this.filePath);

    if (!ret) {
      return Promise.resolve(undefined);
    }
    const curr = ret.features?.filter((f) => f.name === feature);
  }
}
