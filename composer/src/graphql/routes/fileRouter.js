import express from 'express';
import { Logger } from '../utils/Logger.js';
import { FileService } from '../services/FileService.js';
export const fileRouter = express.Router();
// This could be reworked: https://zellwk.com/blog/async-await-express/
// https://zellwk.com/blog/express-errors/
fileRouter.get('/:filename', async (req, res) => {
    try {
        const data = await new FileService(`${req.params.filename}.json`).getFile();
        res.json(data);
    }
    catch (error) {
        Logger.error(`fileRouter: get -> Error: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
