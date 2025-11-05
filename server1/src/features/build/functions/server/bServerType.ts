import path from 'path';

import { Logger } from '../../../../lib/utils/logger.js';
import {
  getFileService,
  getPrettierService,
} from '../../../../lib/utils/ServiceFactory.js';

import type { FieldType } from '../../Features.js';

export const buildServerType = async (data: FieldType, targetPath: string) => {
  Logger.debug(`Build Server Type called`);

  const service = getFileService();
  const prettierService = getPrettierService();
  const ret: string[] = [];

  // Start
  ret.push(`export type ${data.name} = {`);

  const fields = data?.fields?.toSorted((a, b) => a.name.localeCompare(b.name));

  fields?.forEach((field) => {
    ret.push(`readonly '${field.name}: ${field.type};`);
  });

  // End

  ret.push(`};`);

  // src/types/
  const filePath = path.join(targetPath, data.name + '.ts');

  Logger.debug(`Build Server Type: ${filePath}`);

  const formatted = await prettierService.formatCode(ret.join('\n'), filePath);

  service.writeFileSync(formatted, filePath);
};
