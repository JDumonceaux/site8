import express from 'express';
import { PagesService } from '../services/PagesService.js';
import { PageService } from '../services/PageService.js';
import { Logger } from '../utils/Logger.js';
import { PPService } from '../services/PPService.js';
export const pageRouter = express.Router();
// Get item
pageRouter.get('/:id', async (req, res) => {
    Logger.info(`pageRouter: get ->`);
    const id = parseInt(req.params.id);
    if (isNaN(id) || id === 0) {
        return res.status(400).json({ error: 'Invalid ID' });
    }
    try {
        const item = await new PPService().getAllData(id);
        res.json(item);
    }
    catch (error) {
        Logger.error(`pageRouter: get -> Error: ${error}`);
        res.status(500).json({ error: "Internal Server Error" /* Errors.SERVER_ERROR */ });
    }
});
// Update Item
pageRouter.patch('/', async (req, res) => {
    Logger.info(`pageRouter: patch ->`);
    const service = new PagesService();
    const service2 = new PageService();
    const data = req.body;
    try {
        await Promise.all([service.updateItem(data), service2.updateItem(data)]);
        res.json({ results: 'Success' });
    }
    catch (error) {
        Logger.error(`pageRouter: patch -> Error: ${error}`);
        res.status(500).json({ error: "Internal Server Error" /* Errors.SERVER_ERROR */ });
    }
});
// Delete Item
pageRouter.delete('/:id', async (req, res) => {
    Logger.info(`pageRouter: delete ->`);
    const service = new PagesService();
    const service2 = new PageService();
    const id = parseInt(req.params.id);
    if (isNaN(id) || id === 0) {
        return res.status(400).json({ error: 'Invalid ID' });
    }
    try {
        await Promise.all([service.deleteItem(id), service2.deleteItem(id)]);
        res.json({ results: 'Success' });
    }
    catch (error) {
        Logger.error(`pageRouter: delete -> Error: ${error}`);
        res.status(500).json({ error: "Internal Server Error" /* Errors.SERVER_ERROR */ });
    }
});
// Add new item
pageRouter.post('/', async (req, res) => {
    Logger.info(`pageRouter: post ->`);
    const service = new PagesService();
    const service2 = new PageService();
    const data = req.body;
    try {
        const x = await service.getLastId();
        Logger.info('lastId', x);
        if (!x) {
            res.status(500).json({ error: 'Last Id not found.' });
        }
        else {
            const nextId = x + 1;
            const results = await Promise.allSettled([
                service.addItem({ ...data, id: nextId }),
                service2.addItem({ ...data, id: nextId }),
            ]);
            Logger.info('results', results);
            res.json({ results: 'Success' });
        }
    }
    catch (error) {
        Logger.error(`pageRouter: post -> Error: ${error}`);
        res.status(500).json({ error: "Internal Server Error" /* Errors.SERVER_ERROR */ });
    }
});
