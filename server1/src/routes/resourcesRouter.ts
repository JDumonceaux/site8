import express, { Request, Response } from 'express';
import { Logger } from 'utils/Logger';
import { readFileSync } from 'fs';
import { IResources } from 'models/resources/IResources';

export const resourcesRouter = express.Router();
const path = require('path');

resourcesRouter.get('/:id', (req: Request, res: Response) => {
  res.json(getFilteredResources(req.params.id));
});

function getFilteredResources(id: string) {
  const tFileName = 'resources.json';
  Logger.info(`getFilteredResources -> ${tFileName}`);

  const data = readFileSync(
    path.resolve(__dirname, `../data/${tFileName}`),
    'utf8',
  );
  try {
    const jsonData = JSON.parse(data) as IResources;
    const searchId = parseInt(id);
    const ret = jsonData.items.filter((x) => x.set?.includes(searchId));
    return { ...jsonData.metadata, items: ret };
  } catch (error) {
    Logger.debug(`getFilteredResources -> ${error}`);
  }
}
