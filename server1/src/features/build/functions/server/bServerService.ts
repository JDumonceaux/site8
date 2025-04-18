import { Logger } from '../../../../lib/utils/logger.js';
import { ServiceFactory } from '../../../../lib/utils/ServiceFactory.js';
import path from 'path';
import { FieldType } from '../../Features.js';

export const buildServerType = async (data: FieldType, targetPath: string) => {
  Logger.debug(`Build Server Service called`);

  const service = ServiceFactory.getFileService();
  const prettierService = ServiceFactory.getPrettierService();
  const ret: string[] = [];

  // Imports
  ret.push(`import { Logger } from '../../lib/utils/logger.js';`);
  ret.push(`import { cleanUpData } from '../../lib/utils/objectUtil.js';`);
  ret.push(`import { Image } from '../../types/Image.js';`);
  ret.push(`import { Images } from '../../types/Images.js';`);

  // Function
  ret.push(`export class ImageService {`);

  // getItem

  // Fields
  const fields = data?.fields?.toSorted((a, b) => a.name.localeCompare(b.name));

  fields?.forEach((field) => {
    ret.push(`readonly '${field.name}: ${field.type};`);
  });

  // End
  ret.push(`};`);

  // src/types/
  const filePath = path.join(targetPath, data.name + '.ts');

  Logger.debug(`Build Server Service: ${filePath}`);

  const formatted = await prettierService.formatCode(ret.join('\n'), filePath);

  service.writeFileSync(formatted, filePath);
};
