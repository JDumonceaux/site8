import express from 'express';
import { getFilePath } from '../utils/getFilePath.js';
export const pagesRouter = express.Router();
pagesRouter.get('/', (_req, res) => {
    res.sendFile(getFilePath('pages.json'));
});
