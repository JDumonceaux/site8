import express from 'express';
import { Logger } from '../utils/Logger.js';
import { readFileSync } from 'fs';
import { getFilePath } from '../utils/getFilePath.js';
export const resourcesRouter = express.Router();
resourcesRouter.get('/:id', (req, res) => {
    res.json(getFilteredResources(req.params.id));
});
function getFilteredResources(id) {
    Logger.info(`getFilteredResources ->`);
    const data = readFileSync(getFilePath('resources.json'), 'utf8');
    try {
        const jsonData = JSON.parse(data);
        const searchId = parseInt(id);
        const ret = jsonData.items.filter((x) => x.set?.includes(searchId));
        return { ...jsonData.metadata, items: ret };
    }
    catch (error) {
        Logger.debug(`getFilteredResources -> ${error}`);
    }
    return undefined;
}
