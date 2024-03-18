import { readFile, writeFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import { getFilePath } from '../utils/getFilePath.js';
import { Logger } from '../utils/Logger.js';
export class PageService {
    async getItem(id) {
        Logger.info(`PageService: getItem -> `);
        try {
            const filePath = getFilePath(`page${id.toString()}-en.txt`);
            return await readFile(filePath, 'utf8');
        }
        catch (error) {
            Logger.error(`PageService: getItem --> Error: ${error}`);
            throw new Error(`getItem -> Failed to read file: ${error}`);
        }
    }
    async addItem(data) {
        Logger.info(`PageService: addItem -> `);
        if (data.text === undefined || data.text.trim().length === 0) {
            return Promise.reject(new Error('addItem -> Text is required'));
        }
        if (data.long_title === undefined || data.long_title.trim().length === 0) {
            return Promise.reject(new Error('addItem -> Long Title is required'));
        }
        try {
            const filePath = getFilePath(`page${data.id.toString()}-en.txt`);
            Logger.info(`PageService: writeFile -> ${filePath}`);
            return await writeFile(filePath, data.text, 'utf8');
        }
        catch (error) {
            Logger.error(`PageService: addItem --> Error: ${error}`);
            throw new Error(`addItem -> Failed to read file: ${error}`);
        }
    }
    async updateItem(data) {
        Logger.info(`PageService: updateItem -> `);
        const fileName = `page${data.id.toString()}-en.txt`;
        const filePath = getFilePath(fileName);
        if (data.text === undefined || data.text.trim().length === 0) {
            return Promise.reject(new Error('updateItem -> Text is required'));
        }
        if (data.long_title === undefined || data.long_title.trim().length === 0) {
            return Promise.reject(new Error('updateItem -> Long Title is required'));
        }
        try {
            return await writeFile(filePath, data?.text || '', {
                encoding: 'utf8',
                flag: 'w',
            });
        }
        catch (error) {
            Logger.error(`PageService: updateItem --> Error: ${error}`);
            throw new Error(`updateItem -> Failed to update file: ${error}`);
        }
    }
    async deleteItem(id) {
        Logger.info(`PageService: deleteItem -> `);
        const fileName = `page${id.toString()}-en.txt`;
        const filePath = getFilePath(fileName);
        try {
            if (existsSync(filePath)) {
                return await unlink(filePath);
            }
            else {
                throw new Error(`deleteItem -> File does not exist: ${fileName}`);
            }
        }
        catch (error) {
            Logger.error(`PageService: deleteItem --> Error: ${error}`);
            Logger.error(`Failed to delete file: ${error}`);
            throw error;
        }
    }
}
