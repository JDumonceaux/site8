import { Logger } from '../../lib/utils/logger.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';
import { Feature } from './Features.js';

export const buildServerType = async (data: Feature, path: string) => {
  Logger.debug(`Build Feature called`);

  const service = ServiceFactory.getFileService();

  const ret: string[] = [];
  const fields = data?.types?.[0]?.fields?.toSorted((a, b) =>
    a.name.localeCompare(b.name),
  );

  fields?.forEach((field) => {
    ret.push(`readonly '${field.name}: ${field.type};`);
  });

  service.writeFile(
    `${path}\${data?.description}\${data?.types?.[0].name}.ts`,
    ret.join('\n'),
  );
};
