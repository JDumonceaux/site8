import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import { getFilePath } from '../utils/getFilePath.js';
import { Logger } from '../utils/Logger.js';
export const pageRouter = express.Router();
const FILE_NAME = 'pages.json';
pageRouter.get('/:id', (req, res) => {
    // eslint-disable-next-line promise/catch-or-return, promise/always-return
    getAllData(req.params.id).then(([r0, r1]) => {
        res.json({ ...r0, text: r1 });
    });
});
pageRouter.patch('/is', (req, res) => {
    const data = req.body;
    // eslint-disable-next-line promise/catch-or-return, promise/always-return
    updateData(req.params.id, data, getFilePath(FILE_NAME)).then(() => {
        res.json({ ...data });
    });
});
pageRouter.post('/', (req, res) => {
    const data = req.body;
    // eslint-disable-next-line promise/catch-or-return, promise/always-return
    appendData(data, getFilePath(FILE_NAME)).then(() => {
        res.json({ ...data });
    });
});
function getAllData(id) {
    const tempId = parseInt(id);
    // Validate the id
    if (!isNaN(tempId) && tempId > 0) {
        const promise1 = getMetaData(tempId.toString(), getFilePath(FILE_NAME));
        const promise2 = readFile(getFilePath('page' + tempId + '-en.txt'), {
            encoding: 'utf8',
        });
        return Promise.all([promise1, promise2]);
    }
    return Promise.all([Promise.resolve(undefined), Promise.resolve(undefined)]);
}
function getMetaData(id, filePath) {
    return readFile(filePath, {
        encoding: 'utf8',
    }).then((results) => {
        return getPage(id, results);
    });
}
function getPage(id, data) {
    try {
        const jsonData = JSON.parse(data);
        const searchId = parseInt(id);
        const item = jsonData.items.find((x) => x.id === searchId);
        return { ...jsonData.metadata, item: item };
    }
    catch (error) {
        Logger.debug(`getPage -> ${error}`);
    }
    return undefined;
}
function appendData(data, filePath) {
    const lastId = getLastId(filePath);
    const nextId = lastId ? lastId + 1 : +1;
    return readFile(filePath, {
        encoding: 'utf8',
    }).then((results) => {
        const jsonData = JSON.parse(results);
        const ret = {
            ...jsonData,
            items: [...jsonData.items, { ...data, id: nextId }],
        };
        writeFile(filePath, JSON.stringify(ret, null, 2), {
            encoding: 'utf8',
        });
        return null;
    });
}
function updateData(id, data, filePath) {
    return readFile(filePath, {
        encoding: 'utf8',
    }).then((results) => {
        const jsonData = JSON.parse(results);
        const searchId = parseInt(id);
        const filteredItems = jsonData.items.filter((x) => x.id !== searchId);
        const ret = { ...jsonData, items: [...filteredItems, data] };
        writeFile(filePath, JSON.stringify(ret, null, 2), {
            encoding: 'utf8',
        });
        return null;
    });
}
function getLastId(filePath) {
    // eslint-disable-next-line promise/catch-or-return
    readFile(filePath, {
        encoding: 'utf8',
    }).then((results) => {
        const jsonData = JSON.parse(results);
        const maxItem = jsonData.items.reduce(function (a, b) {
            if (+a.id > +b.id) {
                return a;
            }
            else {
                return b;
            }
        });
        return maxItem ? maxItem.id : undefined;
    });
    return undefined;
}
