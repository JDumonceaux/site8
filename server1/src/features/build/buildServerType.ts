import { Logger } from '../../lib/utils/logger.js';
import { ServiceFactory } from '../../lib/utils/ServiceFactory.js';
import { Feature } from './Features.js';

const service = ServiceFactory.getFileService(0);

export const buildServerType = async (data: Feature) => {
  Logger.debug(`Build Feature called`);

  const ret: string[] = [];
  const fields = data?.types?.[0]?.fields?.toSorted((a, b) =>
    a.name.localeCompare(b.name),
  );

  fields?.forEach((field) => {
    ret.push(`readonly '${field.name}: ${field.type};`);
  });

  service.writeFile(`${data?.types?.[0].name}.ts`, ret.join('\n'));
};
